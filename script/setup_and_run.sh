#!/bin/bash
set -e

SCRIPT_DIR=$(pwd)
BACKEND_DIR=$(cd "$(dirname "$0")/.." && pwd)/backend
BASE_DIR=$(cd "$(dirname "$0")/.." && pwd)

IMAGE_NAME="backend"
IMAGE_TAG="latest"
JAR_FILE="backend/build/libs/backend-0.0.1-SNAPSHOT.jar"
DOCKERFILE="${BACKEND_DIR}/Dockerfile.dev"

cd ${BACKEND_DIR}

echo "Gradle 빌드 중..."

chmod +x ${BACKEND_DIR}/gradlew
${BACKEND_DIR}/gradlew clean build

echo "${IMAGE_NAME}/${IMAGE_TAG} 이미지를 빌드 중..."

docker build --build-arg --no-cache -f "${DOCKERFILE}" -t "${IMAGE_NAME}:${IMAGE_TAG}" "${BASE_DIR}"

echo "도커 이미지 빌드 완료"

# ----------------------------------------------

cd ${SCRIPT_DIR}
echo "👉 docker-compose를 사용하여 API와 MySQL 컨테이너를 실행합니다..."

API_CONTAINER_NAME="backend_api"
DB_CONTAINER_NAME="backend_mysql"

EXISTING_CONTAINER=$(docker ps -aq --filter "name=^/${API_CONTAINER_NAME}$")
if [ -n "$EXISTING_CONTAINER" ]; then
  echo "👉 기존 컨테이너 '$API_CONTAINER_NAME' 발견: 제거합니다..."
  docker rm -f "$EXISTING_CONTAINER"
fi
EXISTING_CONTAINER=$(docker ps -aq --filter "name=^/${DB_CONTAINER_NAME}$")
if [ -n "$EXISTING_CONTAINER" ]; then
  echo "👉 기존 컨테이너 '$DB_CONTAINER_NAME' 발견: 제거합니다..."
  docker rm -f "$EXISTING_CONTAINER"
fi

docker-compose -f docker-compose-dev.yml up -d
echo "✅ 모든 서비스가 백그라운드에서 실행 중입니다."