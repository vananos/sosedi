import React, { Component } from "react";
import Button from "../../common/Button/Button";
import AvatarEditor from "react-avatar-editor";
import PropTypes from "prop-types";
import "./ChangePhotoDialog.scss";
import Trash from "../../icons/avatar-loader/Trash";
import NotificationManager from "../../common/NotificationManager/NotificationManager";
import Dropzone from "react-dropzone";
import FolderIcon from "../../icons/avatar-loader/Folder";
import { ApplicationContext } from "../../../context";

export default class ChangePhotoDialog extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: props.scaleFactor,
    };

    this.fileInput = React.createRef();
  }

  changeScale = e => {
    const scaleFactor = +e.target.value;
    this.setState({ scaleFactor });
  };

  loadSelectedFile = dropped => {
    const file = dropped[0];
    if (!file.type.includes("image")) {
      NotificationManager.notify(
        "Неверный формат файла, необходимо загрузить изображение",
        { type: "error" }
      );
    }

    this.setState({ selectedImage: file });
  };

  deleteImage = () => {
    if (this.state.selectedImage) {
      this.setState({ selectedImage: null });
    }
  };

  saveSelectedImage = () => {
    const formData = new FormData();

    this.editor.getImage().toBlob(blob => {
      formData.append("file", blob);
      formData.append("userId", this.props.context.getUserId());
      this.props.context.api
        .loadAvatar(formData)
        .ifSuccess(response => {
          NotificationManager.notify("Изображение успешно загружено");
          this.props.newAvatarCallback(response.data.name);
        })
        .execute();
    });
  };

  setEditorRef = editor => (this.editor = editor);

  render() {
    const { scaleFactor, selectedImage } = this.state;

    const avatarDropZoneOrCropper = !selectedImage ? (
      <Dropzone
        onDrop={this.loadSelectedFile}
        style={{ width: "280px", height: "280px" }}
      >
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className="avatar-loader-drop-zone">
              <FolderIcon width={60} height={60} />
              <input {...getInputProps()} hidden />
            </div>
          );
        }}
      </Dropzone>
    ) : (
      <AvatarEditor
        ref={this.setEditorRef}
        image={selectedImage}
        width={180}
        height={180}
        border={50}
        borderRadius={90}
        color={[0, 0, 0, 0.5]}
        scale={scaleFactor}
        rotate={1}
      />
    );

    return (
      <div onClick={e => e.stopPropagation()}>
        {avatarDropZoneOrCropper}
        <input
          type="range"
          min="1"
          max={"" + this.props.maxScaleFactor}
          step={0.3}
          name="scaleFactor"
          value={scaleFactor}
          onClick={this.changeScale}
          className="avatar-loader-scale"
          onChange={this.changeScale}
        />
        <div className="avatar-loader-actions">
          <Trash width={35} height={35} onClick={this.deleteImage} />
        </div>
        <div>
          <Button disabled={!selectedImage} onClick={this.saveSelectedImage}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}

ChangePhotoDialog.defaultProps = {
  scaleFactor: 1,
  maxScaleFactor: 5
};

ChangePhotoDialog.propTypes = {
  scaleFactor: PropTypes.number,
  maxScaleFactor: PropTypes.number,
  savedImage: PropTypes.string,
  newAvatarCallback: PropTypes.func
};
