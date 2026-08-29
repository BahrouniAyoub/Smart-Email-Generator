import { useState } from "react";
import type { EmailTemplate } from "../data/emailTemplates";

interface TemplateSelectorProps {
  templates: EmailTemplate[];
  onSelect: (template: EmailTemplate) => void;
}

export function TemplateSelector({
  templates,
  onSelect,
}: TemplateSelectorProps) {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string | null>(null);

  const handleSelect = (template: EmailTemplate) => {
    setSelectedTemplateId(template.id);
    onSelect(template);
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Start from a template
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose a common email type to prefill the form.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const isSelected =
            selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() =>
                handleSelect(template)
              }
              className={`group cursor-pointer rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                isSelected
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {template.name}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {template.description}
                  </p>
                </div>

                {isSelected && (
                  <span className="shrink-0 text-sm font-medium text-gray-900">
                    ✓
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
