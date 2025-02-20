export interface WorkbookSection {
  BreakPage: string;
  title: string;
  content: string;
}

export interface WorkbookGroup {
  groupName: string;
  creditsRequired?: number;
  qtyRequired: number;
  units: string[];
  selected: string[];
}

export interface WorkbookUnit {
    title: string;
    data: string[];
    subUnits: {
      [key: string]: WorkbookSubUnitI
    };
};
export interface WorkbookSubUnitI  {
    title: string;
    questions: {
        [key: string]: string;
    };
    answers: {
        [key: string]: string;
    };
};

export interface WorkbookI {
  version: string;
  versionDate: string;
  Organisation: string;
  specs: string;
  coverTitle: string;
  coverImg: string;
  coverAcademyImg: string;
  sections: WorkbookSection[];
  unitsColumnsData: string[];
  useCredits?: boolean;
  unitsMandatory: WorkbookGroup[];
  unitsOptional: WorkbookGroup[];
  units: {
      [key: string]: WorkbookUnit;
  };
  student: {
    name: string,
    signature: string,
    signatureDate: string
  }
}
