class ImageEditManager {
    constructor() {
        this.canvas = document.getElementById('editCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentTool = 'smart-repair';
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.history = [];
        this.maxHistorySteps = 10;
        this.brushSize = 20;
        this.strength = 0.5;
        
        // 纹理克隆相关属性
        this.sourcePoint = null;
        this.cloneData = null;
        this.isSettingSource = false;
        
        this.initializeEventListeners();
        this.initializeWorker();
    }

    // ... [之前发送的完整 ImageEditManager 类代码]
}
