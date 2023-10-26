import axios from "axios";
import { useEffect, useState, useRef } from "react";
import EditModal from "./components/editModal";
//* axiosu özelleştirme
axios.defaults.baseURL = "http://localhost:3030/";

function App() {
  const [todos, setPosts] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [ShowEditModal, setShowEditModal] = useState(false);
  //* 1.yol useState
  const [todoText, setTodoText] = useState("");
  //* 2. yol useRef
  const inputRef = useRef();

  useEffect(() => {
    axios
      // * kendi oluşturduğumuz apiye get atma
      .get("/todos")
      // * gelen veriyi state aktarma
      .then((res) => setPosts(res.data));
  }, []);
  //*butona tıklandığı an çalışır
  const hanleSubmit = (e) => {
    e.preventDefault();
    //* 1- apiye göndereceğim objeyi hazırla
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };
    //* hazırlanan objeyi gönderme
    axios
      .post("/todos", newTodo)
      // apiye başarılı şekilde güncellendi ise
      .then(() => setPosts([...todos, newTodo]));
    //* inputa odaklan
    inputRef.current.value = "";
    inputRef.current.focus();
  };
  const handleDelete = (id) => {
    axios
      .delete(`/todos/${id}`)
      // eğer apiden state den de sil
      .then(() => {
        //*dilinecek diziden .ıkarma
        const filtered = todos.filter((todo) => todo.id !== id);
        setPosts(filtered);
      });
  };
  //* checlbox a tıklanınca calışır

  const handleEdit = (todo) => {
    //* gönderilecek objenin güncel halini hazırla
    var updatedTodo = { ...todo, isDone: !todo.isDone };

    //* güncel hali apiye gönderilecek
    axios
      .put(`/todos/${todo.id}`, updatedTodo)
      //* api güncellenirse statei güncelle
      .then(() => {
        const cloneTodos = [...todos];
        //*elemanın sırasını bul
        const index = cloneTodos.findIndex((item) => item.id === todo.id);
        //* splice metodu kullanımı
        cloneTodos.splice(index, 1, updatedTodo);
        //*güncel versiyonu state aktar
        setPosts(cloneTodos);
      });
  };
  //* düzenle butonuna tıklanınca
  const handleChange = (todo) => {
    setEditItem(todo);
    setShowEditModal(true);
  };

  const handleChangeConfirm = () => {
    //* apiyi günceller
    axios
      //* stati güncelleme kısmı
      .put(`/todos/${editItem.id}`, editItem)

      //* stati güncellle
      .then(() => {
        const clone = [...todos];
        const index = clone.findIndex((item) => item.id === editItem.id);
        clone.splice(index, 1, editItem);
        setPosts(clone);
      });
    //* pencereyi kapat
    setShowEditModal(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center my-4">Postlar</h2>

      <form onSubmit={hanleSubmit} className="d-flex">
        <input
          ref={inputRef}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
          className="form-control "
        />
        <button className="btn btn-primary mx-1">Gönder</button>
      </form>
      <ul className="mt-4 list-group">
        {todos.map((todo) => (
          <li className="d-flex list-group-item align-items-center justify-content-between">
            <span>
              <input
                onClick={() => handleEdit(todo)}
                checked={todo.isDone}
                type="checkbox"
              />
              {todo.isDone ? "Tamamlandı" : "Devam ediyor"}
            </span>
            <span>{todo.title}</span>
            <div className="btn-group">
              <button
                onClick={() => handleChange(todo)}
                className="btn btn-success "
              >
                {" "}
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="btn btn-danger "
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      {ShowEditModal && (
        <EditModal
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
          editItem={editItem}
          handleChangeConfirm={handleChangeConfirm}
        />
      )}
    </div>
  );
}

export default App;

/* 
    fetch("http://jsonplaceholder.typicode.com/posts")
    // veriyi işleme kısmı
      .then((res) => res.json())
      .then((data) => setPosts(data));
     // axios kütüphanesi kullanımı
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((res) =>setPosts(res.data));
*/
