import {Upload, message, Button, Modal} from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import axios from 'axios'


const props = {
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  customRequest(fileObj) {
    const formData = new FormData()
    formData.append('file', fileObj.file)
    formData.append('type', fileObj.file.type)
    return axios.post('/upload', formData)
    .then()
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
   }
  },
};


// eslint-disable-next-line no-undef
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [

    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  upload(fileObj) {
    const formData = new FormData()
    formData.append('file', fileObj.file)
    formData.append('type', fileObj.file.type)
    return axios.post('/upload', formData)
      .then()
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.upload}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default () => {
  return(
    <div>
      <Upload{...props} >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

