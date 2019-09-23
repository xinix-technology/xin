export function teardownMarker (host, id, marker) {
  if (marker &&
    marker.parentElement === host &&
    marker.nodeType === Node.COMMENT_NODE &&
    marker.data === `marker-${id}`) {
    host.removeChild(marker);
  }
}
