export function setupMarker (container, identifier, marker) {
  if (!marker) {
    marker = document.createComment(`marker-${identifier}`);
    container.appendChild(marker);
  }

  return marker;
}
