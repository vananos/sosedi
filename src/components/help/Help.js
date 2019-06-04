import React from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import "./Help.scss";

export default function Help() {
  const handleSubmit = e => {
    console.log(new FormData(e.target));
  };

  return (
    <div className="help-form">
      <span>Ответим на ваши вопросы в кратчайшие сроки.</span>
      <form onSubmit={handleSubmit}>
        <Input name="email" label="email" />
        <Input name="name" label="Имя" />
        Сообщение:
        <textarea name="question" />
        <Button>Отправить</Button>
      </form>
    </div>
  );
}
