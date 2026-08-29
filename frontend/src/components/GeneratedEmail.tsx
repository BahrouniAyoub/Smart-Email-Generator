import type { GeneratedEmailData } from "../types/email";
import {CopyButton} from "./CopyButton";

interface GeneratedEmailProps {
  email: GeneratedEmailData;
}

function GeneratedEmail({
  email,
}: GeneratedEmailProps) {
  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">
        Generated Email
      </h2>

      <div className="mb-5">
        <p className="text-sm text-gray-500 mb-1">
          Subject
        </p>

        <p className="font-medium">
          {email.subject}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">
          Email
        </p>

        <p className="whitespace-pre-line">
          {email.body}
        </p>
      </div>

      <div className="mt-5">
        <CopyButton
          text={`${email.subject}\n\n${email.body}`}
        />
      </div>
    </div>
  );
}

export default GeneratedEmail;