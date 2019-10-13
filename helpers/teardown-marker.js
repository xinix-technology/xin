export function teardownMarker (container, identifier, marker) {
  if (marker &&
    marker.parentElement === container &&
    marker.nodeType === Node.COMMENT_NODE &&
    marker.data === `marker-${identifier}`) {
    container.removeChild(marker);
  }
}
