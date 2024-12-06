self.onmessage = function(e) {
    const { type, data } = e.data;
    switch(type) {
        case 'edge-detection':
            const result = performEdgeDetection(data);
            self.postMessage({ type: 'edge-detection-complete', data: result });
            break;
    }
};

function performEdgeDetection(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = new Uint8ClampedArray(data.length);
    
    // Sobel 算子
    const sobelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];
    
    const sobelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];
    
    for(let y = 1; y < height-1; y++) {
        for(let x = 1; x < width-1; x++) {
            const idx = (y * width + x) * 4;
            let gx = 0;
            let gy = 0;
            
            // 应用 Sobel 算子
            for(let ky = -1; ky <= 1; ky++) {
                for(let kx = -1; kx <= 1; kx++) {
                    const currentIdx = ((y + ky) * width + (x + kx)) * 4;
                    const factor = data[currentIdx];
                    
                    gx += factor * sobelX[ky+1][kx+1];
                    gy += factor * sobelY[ky+1][kx+1];
                }
            }
            
            // 计算梯度强度
            const g = Math.sqrt(gx * gx + gy * gy);
            
            // 设置边缘强度
            output[idx] = g;
            output[idx+1] = g;
            output[idx+2] = g;
            output[idx+3] = 255;
        }
    }
    
    return new ImageData(output, width, height);
}
