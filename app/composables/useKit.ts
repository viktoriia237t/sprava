import { byId } from "~/data/catalog";

const KEY = "sprava-kit";

/* Мій набір: стан спільний для всіх сторінок, зберігається в localStorage */
export function useKit(){
  const ids = useState<string[]>("kit", () => []);
  const toast = useToast();

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ids.value)); } catch {} };
  const has = (id: string) => ids.value.includes(id);

  function toggle(id: string){
    if (has(id)){ ids.value = ids.value.filter(x => x !== id); toast.show("Прибрано з набору"); }
    else { ids.value = [...ids.value, id]; toast.show("Додано в мій набір"); }
    save();
  }
  function addMany(list: string[]){ ids.value = [...new Set([...ids.value, ...list])]; save(); }
  function clear(){ ids.value = []; save(); }
  // Викликається лише в браузері після гідрації, щоб серверний HTML збігався з клієнтським
  function load(){
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(v)) ids.value = v.filter(id => byId[id]);
    } catch {}
  }
  return { ids, has, toggle, addMany, clear, load };
}
