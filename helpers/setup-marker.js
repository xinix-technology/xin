export function setupMarker (host, id, marker) {
  if (!marker) {
    marker = document.createComment(`marker-${id}`);
    host.appendChild(marker);
  }

  return marker;
}
