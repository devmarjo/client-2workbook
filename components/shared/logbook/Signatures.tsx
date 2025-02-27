import { AssessorSignature } from "./AssessorSignature";
import { IQASignature } from "./IQASignature";


export function LogbookSignatures() {
  return(
    <div className="page-break-before">
      <div className="text-3xl text-center">
        Signatures
      </div>
      <div className="flex flex-row">
        <div className="text-center basis-1/2 mt-auto">
            <AssessorSignature />
        </div>
        <div className="text-center basis-1/2 mt-auto">
            <IQASignature />
        </div>
      </div>
    </div>
  )
}
