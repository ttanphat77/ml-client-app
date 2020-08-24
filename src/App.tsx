import React from 'react';
import './App.css';
import {
  Stack,
  PrimaryButton,
  Image,
  IImageProps,
  ImageFit,
  Spinner
} from 'office-ui-fabric-react';
import DetectorService from './service/detectorService'

export const App: React.FunctionComponent = () => {

  let fileUpload: HTMLInputElement | null;
  const detectorService = new DetectorService();
  const imageProps: Partial<IImageProps> = {
    imageFit: ImageFit.centerContain,
    width: 'auto',
    height: '55vh',
  };


  function _detectCats() {
    setIsLoading(true);
    setImage('');
    var data = new FormData();
    data.append('file', fileUpload!.files![0]);
    detectorService.detectCats(data)
      .then(rs => {
        setImage(rs.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        alert(err)});
  }

  const [disabledButton, setDisabled] = React.useState(true);
  const [image, setImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="wrapper">
      <Stack horizontalAlign="center">
        <h1>Find the cats</h1>
        <Stack style={{ width: '80vw' }} gap={25}>
          <input type="file" accept="image/*" onChange={() => setDisabled(false)} ref={(ref) => fileUpload = ref} />
          <PrimaryButton text="Cool :v" onClick={_detectCats} allowDisabledFocus disabled={disabledButton} />
          {isLoading ?
            <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" /> : ''
          }
          <Image {...imageProps} src={"data:image/png;base64," + image} className="result-img" />
        </Stack>
      </Stack>
    </div>
  );
};


