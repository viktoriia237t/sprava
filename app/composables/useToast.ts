let timer: ReturnType<typeof setTimeout> | undefined;

export function useToast(){
  const msg = useState("toast-msg", () => "");
  const visible = useState("toast-on", () => false);
  function show(m: string){
    msg.value = m; visible.value = true;
    clearTimeout(timer); timer = setTimeout(() => visible.value = false, 1800);
  }
  return { msg, visible, show };
}
