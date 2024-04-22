import React, { useEffect, useState } from 'react';
import './index.scss';
import { ReactComponent as AddIcon } from 'assets/icons/AddBlack.svg';
import { Col, Row, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import { type ImageUploadProps } from 'types/interfaces/PropsInterfaces/common';

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImageUrl,
  imageUrl,
  deleteImage
}) => {
  const [fileList, setFileList] = useState<any>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageUrl(fileList[0]?.thumbUrl);

    return fileList;
  };
  useEffect(() => {
    if (imageUrl) {
      setFileList([
        {
          url: imageUrl,
          status: 'done'
        }
      ]);
    }
  }, [imageUrl]);

  const uploadButton = (
    <Row className="uploadButton">
      <Col className="uploadButton__icon" span={24}>
        <AddIcon />
      </Col>
      <Col className="uploadButton__label" span={24}>
        <span>Upload</span>
      </Col>
    </Row>
  );

  return (
    <div className="uploadImage">
      <Upload
        listType="picture-circle"
        fileList={fileList}
        action={imageUrl}
        onChange={handleChange}
        onRemove={deleteImage}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </div>
  );
};

export default ImageUpload;
