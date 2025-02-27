export interface LogbookUnit {
  assessorComment: string;
  iqaComment: string;
};

export interface LogbookI {
  assessor: {
    name: string,
    signature: string,
    signatureDate: string,
    info: string
  };
  iqa: {
    name: string,
    signature: string,
    signatureDate: string,
    info: string
  };
  units: {
    [key: string]: LogbookUnit;
  }
}

      