import { readonly, ref } from "vue";

const isRenderingPage = ref(true);

function setRenderingStarted() {
  isRenderingPage.value = true;
}

function setRenderingFinished() {
  isRenderingPage.value = false;
}

export default function useLoaderRendering() {
  return {
    isRenderingPage: readonly(isRenderingPage),
    setRenderingStarted,
    setRenderingFinished,
  };
}
