import React, { Component } from 'react';
import { Quagga } from 'quagga';

class Scanner extends Component {
  handleBarcodeScan = (data: any) => {
    console.log('Barcode detected:', data.codeResult.code);
    // Do something with the barcode data
  };

  handleBarcodeError = (error: any) => {
    console.error('Barcode error:', error.message);
    // Handle any errors that occur during scanning
  };

  render() {
    return (
      <div>
        <h1>Barcode Scanner</h1>
        <Quagga
          onDetected={this.handleBarcodeScan}
          onError={this.handleBarcodeError}
          style={{ width: '100%', height: 'auto' }}
          config={{
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: '#barcode-scanner'
            },
            decoder: {
              readers: ['ean_reader']
            }
          }}
        />
        <div id="barcode-scanner"></div>
      </div>
    );
  }
}

export default Scanner;
