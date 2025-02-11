"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { WorkbookI } from "@/utils/2workbookI";
import { toast } from "sonner"


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
  progress: number;
  unitsState: UnitStateI
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
export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const { accessToken, clearTokens } = useAuth();
  const [fileId, setFileId] = useState<string | null>(null);
  const [workbook, setWorkbook] = useState<WorkbookI | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [unitsState, setUnitsState] = useState<UnitStateI>({});

  // Obtém o file_id da URL ou do localStorage
  useEffect(() => {
    const urlFileId = searchParams.get("file_id");
    if (urlFileId) {
      localStorage.setItem("file_id", urlFileId);
      setFileId(urlFileId);
    } else {
      setFileId(localStorage.getItem("file_id"));
    }
  }, []);
  // Obtém o file_id da URL ou do localStorage
  useEffect(() => {
    if (workbook) {
      let countQuestion = 0
      let countAnswer = 0
      const countUnitsState: UnitStateI = {}
      Object.entries(workbook.unitsMandatory).forEach(([, v]) => {
        v.units.map(unit => {
          countUnitsState[unit] = true
          Object.entries(workbook.units[unit].subUnits).map(([, v2]) => {
            countQuestion += Object.keys(v2.questions).length
            if (v2.answers) {
              countAnswer += Object?.keys(v2?.answers).length
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
          Object.entries(workbook.units[unit].subUnits).map(([, v2]) => {
            countQuestion += Object.keys(v2.questions).length
            if (v2.answers) {
              countAnswer += Object?.keys(v2?.answers).length
              if (countUnitsState[unit] && Object.keys(v2.questions).length !== Object?.keys(v2?.answers).length) {
                countUnitsState[unit] = false
              }
            } else if(countUnitsState[unit]) {
              countUnitsState[unit] = false
            }
          })
        })
      })
      setProgress(Math.round((countAnswer/countQuestion)*100))
      setUnitsState(countUnitsState)
    }
  }, [workbook]);

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
  }, [accessToken, fileId]);

  // 🚀 Nova função para salvar as alterações no Google Drive
  const saveWorkbook = () => {
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
  };

  return (
    <FileContext.Provider value={{ fileId, workbook, setFileId, setWorkbook, saveWorkbook, progress, unitsState }}>
      {children}
    </FileContext.Provider>
  );
};