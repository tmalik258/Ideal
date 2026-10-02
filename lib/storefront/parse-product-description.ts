export type ProductAttribute = {
  label: string;
  value: string;
};

export type ParsedProductDescription = {
  attributes: ProductAttribute[];
  prose: string | null;
};

/**
 * Splits free-text product descriptions that use "Label: value" pairs
 * (common Ideal catalog copy) into scannable attributes + leftover prose.
 *
 * Labels are single Capitalized words followed by a colon (Brand:, Type:, …)
 * so values like "ZESH Original" are not mistaken for labels.
 */
export function parseProductDescription(
  description: string | null | undefined
): ParsedProductDescription {
  const trimmed = description?.trim() ?? "";
  if (!trimmed) {
    return { attributes: [], prose: null };
  }

  const labelPattern = /\b([A-Z][A-Za-z0-9]*)\s*:\s*/g;
  const matches = [...trimmed.matchAll(labelPattern)];

  if (matches.length < 2) {
    return { attributes: [], prose: trimmed };
  }

  const attributes: ProductAttribute[] = [];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const label = match[1].trim();
    const valueStart = match.index! + match[0].length;
    const valueEnd =
      i + 1 < matches.length ? matches[i + 1].index! : trimmed.length;
    const value = trimmed.slice(valueStart, valueEnd).trim();
    if (label && value) {
      attributes.push({ label, value });
    }
  }

  if (attributes.length < 2) {
    return { attributes: [], prose: trimmed };
  }

  const firstLabelIndex = matches[0].index!;
  const leading = trimmed.slice(0, firstLabelIndex).trim();

  return {
    attributes,
    prose: leading || null,
  };
}
