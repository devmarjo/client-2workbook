"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { WorkbookI } from "@/utils/2workbookI";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export interface UnitStateI {
  [key: string| number]: boolean 
}

// Tipagem do contexto
interface FileContextType {
  fileId: string | null;
  setFileId: (id: string | null) => void;
  workbook: WorkbookI | null;
  setWorkbook: (content: WorkbookI | null) => void;
  saveWorkbook: () => void;
  CreateNewFileWorkbook: (folderId: string) => void;
  progress: number;
  unitsState: UnitStateI;
  viewer: boolean;
  getWorkbookViewByURL: (url: string) => void;
}


// Criando o contexto com valores padrão
const FileContext = createContext<FileContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile deve ser usado dentro de um FileProvider");
  }
  return context;
};

// Criando o Provider para armazenar os dados
export const FileProvider = ({ children, viewer = false }: { children: React.ReactNode, viewer: boolean }) => {
  const router = useRouter()
  const { accessToken, clearTokens } = useAuth();
  console.log('# ASSSSSSS', accessToken)
  const [fileId, setFileId] = useState<string | null>(null);
  // const [parentFolderId, setParentFolderId] = useState<string | null>(null);
  const [workbook, setWorkbook] = useState<WorkbookI | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [unitsState, setUnitsState] = useState<UnitStateI>({});

  const getParentFolderId =  useCallback(() => {
    fetch(`/api/drive/file/parent?id=${fileId}`, {
      headers: { Authorization: `Bearer ${accessToken}`},
    })            
    .then((resHead) => {
      console.log('HEAD', resHead)
      try {
        const text = resHead.json()
        return text
      } catch (error) {
        console.log(error)
      }
    })            
    .then((dataHEAD) => {
      console.log('HEAD', dataHEAD)
    })
  }, [accessToken, fileId])

  // PROGRESS COMPUTED
  useEffect(() => {
    if (workbook) {
      let countQuestion = 1 // iniciates 1 because signature countes like one question
      let countAnswer = 0
      if (workbook?.student?.signature) {
        countAnswer = 1
      }
      const countUnitsState: UnitStateI = {}
      Object.entries(workbook.unitsMandatory).forEach(([, v]) => {
        v.units.map(unit => {
          countUnitsState[unit] = true
          Object.entries(workbook.units[unit].subUnits).filter(([,v]) => !(v?.isPratical)).map(([, v2]) => {
            countQuestion += Object.keys(v2.questions).length
            if (v2?.answers) {
              countAnswer += Object?.entries(v2.answers).filter(([, v]) => v.length > 0).length
              if (countUnitsState[unit] && Object.keys(v2.questions).length !== Object?.keys(v2?.answers).length) {
                countUnitsState[unit] = false
              }
            } else if(countUnitsState[unit]) {
              countUnitsState[unit] = false
            }
          })
        })
      })
      Object.entries(workbook.unitsOptional).forEach(([, v]) => {
        v.selected.map(unit => {
          countUnitsState[unit] = true
          Object.entries(workbook.units[unit].subUnits).filter(([,v]) => !(v?.isPratical)).map(([, v2]) => {
            countQuestion += Object.keys(v2.questions).length
            if (v2?.answers) {
              countAnswer += Object?.entries(v2.answers).filter(([, v]) => v.length > 0).length
              if (countUnitsState[unit] && Object.keys(v2.questions).length !== Object?.keys(v2?.answers).length) {
                countUnitsState[unit] = false
              }
            } else if(countUnitsState[unit]) {
              countUnitsState[unit] = false
            }
          })
        })
      })
      const proprotion = countAnswer/countQuestion
      setProgress(Math.round((proprotion)*100))
      setUnitsState(countUnitsState)
      if (proprotion >= 1 && typeof workbook.logbook === 'undefined' ) {
        const newWorkbook: WorkbookI = {
          ...workbook,
          logbook: {
            assessor: {
              name: '',
              signature: '',
              signatureDate: '',
              info: ''
            },
            iqa: {
              name: '',
              signature: '',
              signatureDate: '',
              info: ''
            },
            units: {}
          }
        }
        setWorkbook(newWorkbook)
      }
    }
   
  }, [getParentFolderId, workbook]);
  useEffect(() => {
    console.log("Novo token detectado:", accessToken);
  }, [accessToken]);
  
  // Busca o conteúdo do arquivo
  useEffect(() => {
    if (accessToken && fileId) {
      const promise = fetch(`/api/drive/file?id=${fileId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => {
          try {
            const obj = res.json()
            return obj
          } catch (error) {
            console.log(error)
          }
        })
        .then((data: WorkbookI | { error: string }) => {
          if ('error' in data) {
            console.error("Erro ao buscar arquivo:", data.error);
            throw data.error;
          }
          if (
            "sections" in data &&
            "units" in data
          ) {
            setWorkbook(data);
            getParentFolderId()
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar arquivo:", error);
          router.push('/')
          throw new Error('WORKBOOK DATA IS NOT VALID')
        })
      toast.promise(promise, {
        loading: 'Loading...',
        success: () => {
          return 'Workbook loaded successfully!';
        },
        error: () => {
          return 'Workbook is not valid';
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, fileId])

  //  Nova função para salvar as alterações no Google Drive
  const saveWorkbook = useCallback(() => {
    console.log('workbook?.student', workbook?.student)
    if (viewer) {
      toast('This is View Mode, changes will be not saved, only chached')
      return
    }
    if (!accessToken || !fileId || !workbook) {
      console.error("Não há dados suficientes para salvar");
      return;
    }

    const response = fetch(`/api/drive/file`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fileId, updatedContent: workbook }),
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(res.statusText);
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error || "Erro ao atualizar o arquivo");
      } 
      return true
    })
    .catch((e) => {
      return e
    })

    toast.promise(response, {
      loading: 'Saving...',
      success: () => {
        return 'Workbook saved!';
      },
      error: (e) => {
        return e;
      },
    });
  }, [accessToken, fileId, viewer, workbook])

  const firstRender = useRef(true);
  useEffect(() => {
    console.log('workbook MUDOU ', workbook)
    if (workbook && firstRender.current) {
      firstRender.current = false; // Marca como já executado
      return; // Impede a execução na primeira renderização
    }
  
    if (workbook) {
      saveWorkbook();
    }
  }, [saveWorkbook, workbook])
  // const saveWorkbook = () => {
  //   if (viewer) {
  //     toast('This is View Mode, changes will be not saved, only chached')
  //     return
  //   }
  //   if (!accessToken || !fileId || !workbook) {
  //     console.error("Não há dados suficientes para salvar");
  //     return;
  //   }

  //   const response = fetch(`/api/drive/file`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify({ fileId, updatedContent: workbook }),
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json()
  //     }
  //     throw new Error(res.statusText);
  //   })
  //   .then(data => {
  //     if (data.error) {
  //       throw new Error(data.error || "Erro ao atualizar o arquivo");
  //     } 
  //     return true
  //   })
  //   .catch((e) => {
  //     return e
  //   })

  //   toast.promise(response, {
  //     loading: 'Saving...',
  //     success: () => {
  //       return 'Workbook saved!';
  //     },
  //     error: (e) => {
  //       return e;
  //     },
  //   });
  // };

  //  Nova função para Criar workbooks no GFrive
  const CreateNewFileWorkbook = (folderId: string) => {
    if (!viewer) {
      toast('This functions is only for View Mode')
      return
    }
    // folderId, accessToken, workbook
    if (!accessToken || !folderId || !workbook) {
      console.error("Não há dados suficientes para salvar");
      return;
    }


    fetch(`/api/drive/folder?id=`+folderId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((res) => {
      if(res.ok) {
        const response = fetch(`/api/drive/file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ folderId, workbook }),
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error(res.statusText);
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error || "Erro ao atualizar o arquivo");
          } 
          return true
        })
        .catch((e) => {
          return e
        })

        toast.promise(response, {
          loading: 'Saving...',
          success: () => {
            return 'Workbook saved!';
          },
          error: (e) => {
            return e;
          },
        });
      } else {
        throw 'FOLDE CANNOT BE OPENED'
      }
    }).catch((e) => {
      toast(e)
    })

  };

  const getWorkbookViewByURL = (url: string) => {
    if (url) {
      setFileId(null)
      const promise = fetch(url)
        .then((res) => {
          try {
            const obj = res.json()
            return obj
          } catch (error) {
            console.log(error)
          }
        })
        .then((data: WorkbookI | { error: string }) => {
          if ('error' in data) {
            console.error("Erro ao buscar arquivo:", data.error);
            throw data.error;
          }
          if (
            "sections" in data &&
            "units" in data
          ) {
            setWorkbook(data);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar arquivo:", error);
          clearTokens();
          throw new Error('WORKBOOK DATA IS NOT VALID')
        })
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return 'Workbook loaded successfully!';
          },
          error: () => {
            return 'Workbook is not valid';
          },
        });

    }
  }

  return (
    <FileContext.Provider value={{ fileId, workbook, setFileId, setWorkbook, saveWorkbook, progress, unitsState, viewer, getWorkbookViewByURL, CreateNewFileWorkbook }}>
      {children}
    </FileContext.Provider>
  );
};