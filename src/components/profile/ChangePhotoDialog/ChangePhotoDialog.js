import React, { Component } from "react";
import Button from "../../common/Button/Button";
import AvatarEditor from "react-avatar-editor";

export default class ChangePhotoDialog extends Component {
  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <AvatarEditor
          image="https://randomuser.me/api/portraits/men/77.jpg"
          width={180}
          height={180}
          border={50}
          borderRadius={90}
          color={[0, 0, 0, 0.5]}
          scale={1.2}
          rotate={1}
        />
        <div><Button>Сохранить</Button></div>
      </div>
    );
  }
}
