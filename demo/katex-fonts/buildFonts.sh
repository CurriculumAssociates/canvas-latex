#!/usr/bin/env bash
shopt -s extglob

usage() {
    while [[ $# -gt 1 ]]; do
        echo "$1" >&2
        shift
    done
    echo "Usage: ${0##*/} [OPTIONS]"
    echo ""
    echo "OPTIONS:"
    echo "  -h|--help         display this help"
    echo "  --image NAME:TAG  use the named docker image [$IMAGE]"
    exit $1
}

used_fonts=(
    KaTeX_AMS-Regular
    KaTeX_Caligraphic-Bold
    KaTeX_Caligraphic-Regular
    KaTeX_Fraktur-Bold
    KaTeX_Fraktur-Regular
    KaTeX_Main-Regular
    KaTeX_Main-Bold
    KaTeX_Main-Italic
    KaTeX_Main-BoldItalic
    KaTeX_Math-Regular
    KaTeX_Math-Italic
    KaTeX_Math-BoldItalic
    KaTeX_SansSerif-Bold
    KaTeX_SansSerif-Italic
    KaTeX_SansSerif-Regular
    KaTeX_Script-Regular
    KaTeX_Size1-Regular
    KaTeX_Size2-Regular
    KaTeX_Size3-Regular
    KaTeX_Size4-Regular
    KaTeX_Typewriter-Regular
)

filetypes=( ttf woff woff2 )

set -e
cd "$(dirname "$0")"

cleanup() {
    [[ "${CONTAINER}" ]] \
        && docker stop "${CONTAINER}" >/dev/null \
        && docker rm "${CONTAINER}" >/dev/null
    CONTAINER=
    [[ -f "${TMPFILE}" ]] && rm "${TMPFILE}"
    TMPFILE=
}
CONTAINER=
trap cleanup EXIT

IMAGE="katex/fonts:DF-$(openssl sha1 Dockerfile | tail -c 9)"
TMPFILE="$(mktemp "${TMPDIR:-/tmp}/mjf.XXXXXXXX")"
FILE="$TMPFILE"
pushd "src"
if [[ ! -f fonts/OTF/TeX/Makefile ]]; then
    echo "src does not look like MathJax-dev" >&2
    exit 1
fi
tar cf "$FILE" Makefile default.cfg fonts/OTF/TeX
popd

# build image if missing
if [[ $(docker images "$IMAGE" | wc -l) -lt 2 ]]; then
    echo "Need to build docker image $IMAGE"
    docker build --tag "$IMAGE" .
fi

CMDS="set -ex
tar xf MathJax-dev.tar.gz
cp default.cfg custom.cfg
make custom.cfg.pl
make -C fonts/OTF/TeX ${filetypes[*]}
tar cf /fonts.tar ${filetypes[*]/#/fonts/OTF/TeX/}"

echo "Creating and starting docker container from image $IMAGE"
CONTAINER=$(docker create "$IMAGE" /bin/sh -c "${CMDS}")
if [[ ${FILE} ]]; then
    docker cp "${FILE}" $CONTAINER:/MathJax-dev.tar.gz
fi
docker start --attach $CONTAINER
docker cp $CONTAINER:/fonts.tar .
cleanup
echo "Docker executed successfully, will now unpack the fonts"

tar xf fonts.tar
mv fonts temp
mkdir fonts
for filetype in "${filetypes[@]}"; do
    for font in "${used_fonts[@]}"; do
        echo "$filetype/$font"
        mv "temp/OTF/TeX/$filetype/$font".* ./fonts/
    done
done
rm -rf temp fonts.tar
