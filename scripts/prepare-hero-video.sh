#!/usr/bin/env bash
# Turns a master film into web-ready, silent background video files plus a poster frame.
# These are the settings used for the Hotpack hero (white end card trimmed at 104.4 s).
# Usage: scripts/prepare-hero-video.sh "path/to/film.mov" hotpack-hero [seconds-to-keep]
set -euo pipefail
IN="$1"; NAME="${2:-hero}"; OUT="public/media/video"
TRIM=(); [ -n "${3:-}" ] && TRIM=(-t "$3")
mkdir -p "$OUT"
# MP4 / H.264, 1280px, 24 fps, no audio, fast start. Keep under ~14 MB for the preview host.
ffmpeg -y "${TRIM[@]}" -i "$IN" -an -vf "scale=1280:-2,fps=24" -c:v libx264 -preset slow -crf 23 \
  -maxrate 1.05M -bufsize 2.1M -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME.mp4"
# Smaller 854px version for phones.
ffmpeg -y "${TRIM[@]}" -i "$IN" -an -vf "scale=854:-2,fps=24" -c:v libx264 -preset slow -crf 26 \
  -maxrate 600k -bufsize 1.2M -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME-sm.mp4"
# WebM / VP9 copies for browsers without H.264.
ffmpeg -y "${TRIM[@]}" -i "$IN" -an -vf "scale=1280:-2,fps=24" -c:v libvpx-vp9 -b:v 950k -maxrate 1.2M \
  -bufsize 2.4M -deadline good -cpu-used 4 -row-mt 1 "$OUT/$NAME.webm"
ffmpeg -y "${TRIM[@]}" -i "$IN" -an -vf "scale=854:-2,fps=24" -c:v libvpx-vp9 -b:v 520k -maxrate 700k \
  -bufsize 1.4M -deadline good -cpu-used 4 -row-mt 1 "$OUT/$NAME-sm.webm"
# Poster: the opening frame, shown while loading and under reduced motion.
ffmpeg -y -ss 0.5 -i "$IN" -frames:v 1 -vf "scale=1600:-2" -q:v 78 "$OUT/$NAME-poster.webp"
echo "Done. Point heroVideo in content/site.ts at /media/video/$NAME.*"
