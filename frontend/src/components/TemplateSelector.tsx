import type { EmailTemplate } from "../data/emailTemplates";

interface TemplateSelectorProps {
    templates: EmailTemplate[],
    onSelect: (template: EmailTemplate) => void
}

export function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
                Start from a template
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates.map(template => (
                    <button
                        key={template.id}
                        type="button"
                        className="border rounded-lg p-4 text-left hover:bg-gray-100 transition-colors"
                        onClick={() => onSelect(template)}
                    >
                        <p className="font-medium">
                            {template.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            {template.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}