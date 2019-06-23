import React, { Component } from "react";
import Button from "../../common/Button/Button";
import AvatarEditor from "react-avatar-editor";
import PropTypes from "prop-types";
import "./ChangePhotoDialog.scss";
import NotificationManager from "../../common/NotificationManager/NotificationManager";
import Dropzone from "react-dropzone";
import { ApplicationContext } from "../../../context";
import emptyPhoto from "../../../assets/profile/user-regular.svg";
import addPhoto from "../../../assets/profile/addphoto.svg";

export default class ChangePhotoDialog extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: props.scaleFactor,
      savedImage: props.savedImage
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
      formData.append(
        "userId",
        this.props.context.withUserInfo(userInfo => userInfo.userId)
      );
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

  deleteAvatar = () => {
    if (this.state.savedImage) {
      this.props.context.withUserInfo(userInfo => {
        this.props.context.api
          .deleteAvatar(userInfo.userId)
          .ifSuccess(() => {
            this.setState({ savedImage: null });
            this.props.deleteAvatarCallback();
          })
          .execute();
      });
    } else {
      this.setState({ selectedImage: null });
    }
  };

  render() {
    const { scaleFactor, selectedImage, savedImage } = this.state;

    const avatarDropZoneOrCropper = !selectedImage ? (
      <Dropzone onDrop={this.loadSelectedFile}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className="avatar-loader-drop-zone">
              <img
                src={savedImage ? savedImage : emptyPhoto}
                width={180}
                height={180}
                className="profile-logo-img"
              />
              <img className="add-photo-icon" src={addPhoto} width={30} height={30} />
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
        style={{ width: "250px", height: "250px" }}
      />
    );

    return (
      <div onClick={e => e.stopPropagation()}>
        {avatarDropZoneOrCropper}
        <div className="avatar-loader-actions">
          <svg
            className={`avatar-loader-actions-delete ${
              savedImage || selectedImage ? "active" : ""
            }`}
            width="20"
            height="20"
            strokeWidth={2}
            onClick={this.deleteAvatar}
          >
            <line x1="0" y1="0" x2="20" y2="20" />
            <line x1="20" y1="0" x2="0" y2="20" />
          </svg>
        </div>
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
  newAvatarCallback: PropTypes.func.isRequired,
  deleteAvatarCallback: PropTypes.func.isRequired
};
