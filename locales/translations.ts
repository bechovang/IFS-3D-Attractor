import type { Translation, Language } from "@/types/i18n"

export const translations: Record<Language, Translation> = {
  en: {
    // Common
    loading: "Loading",
    generate: "Generate",
    export: "Export",
    import: "Import",
    reset: "Reset",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    copy: "Copy",

    // App Title
    appTitle: "IFS 3D Attractor",
    appSubtitle: "Explore the world of 3D fractals",

    // Navigation
    presets: "Presets",
    controls: "Controls",
    formulas: "Formulas",
    matrix: "Matrix",
    json: "JSON",
    help: "Help",

    // Controls
    autoRotate: "Auto Rotate",
    stop: "Stop",
    rotate: "Rotate",
    lock: "Lock",
    unlock: "Unlock",
    performance: "Performance",
    quality: "Quality",
    fastMode: "Fast Mode",
    qualityMode: "Quality Mode",
    iterations: "Iterations",
    pointSize: "Point Size",
    opacity: "Opacity",
    gamma: "Gamma",
    intensity: "Intensity",
    backgroundColor: "Background Color",

    // Matrix Editor
    matrixInput: "Matrix Input",
    addMatrix: "Add Matrix",
    probability: "Probability",
    color: "Color",
    enabled: "Enabled",

    // Export
    exportPNG: "Export PNG",
    exportPLY: "Export PLY",
    exportJSON: "Export JSON",
    highQualityRender: "High Quality Render",
    exitRenderMode: "Exit Render Mode",
    renderModeActive: "Render mode active. Click, drag or zoom to exit.",

    // Presets
    fractalPresets: "Fractal Presets",
    loadFractal: "Load Fractal",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    transformations: "transformations",

    // Help
    helpTitle: "User Guide",
    basics: "Basics",
    advanced: "Advanced",
    keyboardShortcuts: "Keyboard Shortcuts",
    whatIsIFS: "What is IFS 3D Attractor?",
    ifsDescription:
      "IFS (Iterated Function System) is a method for creating fractals by repeatedly applying multiple linear transformations. This application allows you to create and explore beautiful 3D fractals.",
    basicSteps: "Basic steps:",
    step1: "1. Choose a fractal preset",
    step1Description: "Click the Presets button to open the Fractal Presets panel and select a preset.",
    step2: "2. Generate fractal",
    step2Description: "Click the Generate button to create a fractal from the selected matrices.",
    step3: "3. Explore fractal",
    step3Description: "Use mouse to rotate, zoom, or use the view angle buttons on the left side of the screen.",

    // Performance
    performanceWarning: "High iteration count may cause lag",
    optimizeForPerformance: "Optimize for Performance",
    performanceStats: "Performance Stats",
    points: "Points",
    functions: "Functions",
    optimal: "Optimal",
    good: "Good",
    heavy: "Heavy",

    // Messages
    generating: "Generating fractal...",
    pleaseWait: "Please wait a moment",
    exportSuccess: "Export successful!",
    importSuccess: "Import successful!",
    error: "Error",
    noMatrices: "No matrices defined.",
    addMatrixToStart: 'Click "Add Matrix" to start creating your IFS attractor.',

    // PLY Export specific
    pointDensity: "Point Density",
    meshQuality: "Mesh Quality",
    previewQuality: "Preview/Draft",
    standardQuality: "Standard Quality",
    highQuality: "High Quality",
    ultraQuality: "Ultra High Quality",
    customQuality: "Custom",
    totalPoints: "Total Points",
    exportPoints: "Export Points",
    samplingRatio: "Sampling Ratio",
    estimatedSize: "Estimated Size",
    meshRecommendations: "Mesh Generation Recommendations",
    recommendedAlgorithms: "Recommended Algorithms",
    suitableFor: "Suitable For",
    softwareCompatibility: "Software Compatibility",
    meshGenerationSoftware: "Mesh Generation Software",
    threeDSoftwareImport: "3D Software Import",
    highPointCountWarning: "High Point Count Warning",
    exportPointsButton: "Export {count} Points",
  },

  vi: {
    // Common
    loading: "Đang tải",
    generate: "Tạo",
    export: "Xuất",
    import: "Nhập",
    reset: "Đặt lại",
    close: "Đóng",
    save: "Lưu",
    cancel: "Hủy",
    delete: "Xóa",
    copy: "Sao chép",

    // App Title
    appTitle: "IFS 3D Attractor",
    appSubtitle: "Khám phá thế giới fractal 3D",

    // Navigation
    presets: "Mẫu có sẵn",
    controls: "Điều khiển",
    formulas: "Công thức",
    matrix: "Ma trận",
    json: "JSON",
    help: "Trợ giúp",

    // Controls
    autoRotate: "Tự động xoay",
    stop: "Dừng",
    rotate: "Xoay",
    lock: "Khóa",
    unlock: "Mở",
    performance: "Hiệu suất",
    quality: "Chất lượng",
    fastMode: "Chế độ nhanh",
    qualityMode: "Chế độ chất lượng",
    iterations: "Số lần lặp",
    pointSize: "Kích thước điểm",
    opacity: "Độ mờ",
    gamma: "Gamma",
    intensity: "Cường độ",
    backgroundColor: "Màu nền",

    // Matrix Editor
    matrixInput: "Nhập ma trận",
    addMatrix: "Thêm ma trận",
    probability: "Xác suất",
    color: "Màu sắc",
    enabled: "Kích hoạt",

    // Export
    exportPNG: "Xuất PNG",
    exportPLY: "Xuất PLY",
    exportJSON: "Xuất JSON",
    highQualityRender: "Render chất lượng cao",
    exitRenderMode: "Thoát chế độ render",
    renderModeActive: "Chế độ render đang hoạt động. Nhấp, kéo hoặc zoom để thoát.",

    // Presets
    fractalPresets: "Mẫu Fractal",
    loadFractal: "Tải Fractal",
    difficulty: "Độ khó",
    easy: "Dễ",
    medium: "Trung bình",
    hard: "Khó",
    transformations: "phép biến đổi",

    // Help
    helpTitle: "Hướng dẫn sử dụng",
    basics: "Cơ bản",
    advanced: "Nâng cao",
    keyboardShortcuts: "Phím tắt",
    whatIsIFS: "IFS 3D Attractor là gì?",
    ifsDescription:
      "IFS (Iterated Function System) là một phương pháp tạo ra các hình fractal bằng cách áp dụng nhiều phép biến đổi tuyến tính lặp đi lặp lại. Ứng dụng này cho phép bạn tạo và khám phá các fractal 3D đẹp mắt.",
    basicSteps: "Các bước cơ bản:",
    step1: "1. Chọn một mẫu fractal",
    step1Description: "Nhấn nút Mẫu có sẵn để mở bảng Fractal Presets và chọn một mẫu.",
    step2: "2. Tạo fractal",
    step2Description: "Nhấn nút Tạo để tạo fractal từ các ma trận đã chọn.",
    step3: "3. Khám phá fractal",
    step3Description: "Sử dụng chuột để xoay, phóng to/nhỏ, hoặc dùng các nút góc nhìn ở bên trái màn hình.",

    // Performance
    performanceWarning: "Số lần lặp cao có thể gây lag",
    optimizeForPerformance: "Tối ưu cho hiệu suất",
    performanceStats: "Thống kê hiệu suất",
    points: "Điểm",
    functions: "Hàm",
    optimal: "Tối ưu",
    good: "Tốt",
    heavy: "Nặng",

    // Messages
    generating: "Đang tạo fractal...",
    pleaseWait: "Vui lòng đợi trong giây lát",
    exportSuccess: "Xuất thành công!",
    importSuccess: "Nhập thành công!",
    error: "Lỗi",
    noMatrices: "Chưa có ma trận nào được định nghĩa.",
    addMatrixToStart: 'Nhấp "Thêm ma trận" để bắt đầu tạo IFS attractor.',

    // PLY Export specific
    pointDensity: "Mật độ điểm",
    meshQuality: "Chất lượng mesh",
    previewQuality: "Xem trước/Nháp",
    standardQuality: "Chất lượng tiêu chuẩn",
    highQuality: "Chất lượng cao",
    ultraQuality: "Chất lượng siêu cao",
    customQuality: "Tùy chỉnh",
    totalPoints: "Tổng số điểm",
    exportPoints: "Điểm xuất",
    samplingRatio: "Tỷ lệ lấy mẫu",
    estimatedSize: "Kích thước ước tính",
    meshRecommendations: "Khuyến nghị tạo mesh",
    recommendedAlgorithms: "Thuật toán khuyến nghị",
    suitableFor: "Phù hợp cho",
    softwareCompatibility: "Tương thích phần mềm",
    meshGenerationSoftware: "Phần mềm tạo mesh",
    threeDSoftwareImport: "Nhập vào phần mềm 3D",
    highPointCountWarning: "Cảnh báo số điểm cao",
    exportPointsButton: "Xuất {count} điểm",
  },

  zh: {
    // Common
    loading: "加载中",
    generate: "生成",
    export: "导出",
    import: "导入",
    reset: "重置",
    close: "关闭",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    copy: "复制",

    // App Title
    appTitle: "IFS 3D 吸引子",
    appSubtitle: "探索3D分形世界",

    // Navigation
    presets: "预设",
    controls: "控制",
    formulas: "公式",
    matrix: "矩阵",
    json: "JSON",
    help: "帮助",

    // Controls
    autoRotate: "自动旋转",
    stop: "停止",
    rotate: "旋转",
    lock: "锁定",
    unlock: "解锁",
    performance: "性能",
    quality: "质量",
    fastMode: "快速模式",
    qualityMode: "质量模式",
    iterations: "迭代次数",
    pointSize: "点大小",
    opacity: "不透明度",
    gamma: "伽马",
    intensity: "强度",
    backgroundColor: "背景颜色",

    // Matrix Editor
    matrixInput: "矩阵输入",
    addMatrix: "添加矩阵",
    probability: "概率",
    color: "颜色",
    enabled: "启用",

    // Export
    exportPNG: "导出PNG",
    exportPLY: "导出PLY",
    exportJSON: "导出JSON",
    highQualityRender: "高质量渲染",
    exitRenderMode: "退出渲染模式",
    renderModeActive: "渲染模式已激活。点击、拖拽或缩放以退出。",

    // Presets
    fractalPresets: "分形预设",
    loadFractal: "加载分形",
    difficulty: "难度",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    transformations: "变换",

    // Help
    helpTitle: "用户指南",
    basics: "基础",
    advanced: "高级",
    keyboardShortcuts: "键盘快捷键",
    whatIsIFS: "什么是IFS 3D吸引子？",
    ifsDescription:
      "IFS（迭代函数系统）是通过重复应用多个线性变换来创建分形的方法。此应用程序允许您创建和探索美丽的3D分形。",
    basicSteps: "基本步骤：",
    step1: "1. 选择分形预设",
    step1Description: "点击预设按钮打开分形预设面板并选择预设。",
    step2: "2. 生成分形",
    step2Description: "点击生成按钮从选定的矩阵创建分形。",
    step3: "3. 探索分形",
    step3Description: "使用鼠标旋转、缩放，或使用屏幕左侧的视角按钮。",

    // Performance
    performanceWarning: "高迭代次数可能导致延迟",
    optimizeForPerformance: "优化性能",
    performanceStats: "性能统计",
    points: "点",
    functions: "函数",
    optimal: "最佳",
    good: "良好",
    heavy: "重",

    // Messages
    generating: "正在生成分形...",
    pleaseWait: "请稍等",
    exportSuccess: "导出成功！",
    importSuccess: "导入成功！",
    error: "错误",
    noMatrices: "未定义矩阵。",
    addMatrixToStart: '点击"添加矩阵"开始创建您的IFS吸引子。',

    // PLY Export specific
    pointDensity: "点密度",
    meshQuality: "网格质量",
    previewQuality: "预览/草稿",
    standardQuality: "标准质量",
    highQuality: "高质量",
    ultraQuality: "超高质量",
    customQuality: "自定义",
    totalPoints: "总点数",
    exportPoints: "导出点数",
    samplingRatio: "采样比例",
    estimatedSize: "估计大小",
    meshRecommendations: "网格生成建议",
    recommendedAlgorithms: "推荐算法",
    suitableFor: "适用于",
    softwareCompatibility: "软件兼容性",
    meshGenerationSoftware: "网格生成软件",
    threeDSoftwareImport: "3D软件导入",
    highPointCountWarning: "高点数警告",
    exportPointsButton: "导出 {count} 点",
  },

  ja: {
    // Common
    loading: "読み込み中",
    generate: "生成",
    export: "エクスポート",
    import: "インポート",
    reset: "リセット",
    close: "閉じる",
    save: "保存",
    cancel: "キャンセル",
    delete: "削除",
    copy: "コピー",

    // App Title
    appTitle: "IFS 3D アトラクター",
    appSubtitle: "3Dフラクタルの世界を探索",

    // Navigation
    presets: "プリセット",
    controls: "コントロール",
    formulas: "数式",
    matrix: "マトリックス",
    json: "JSON",
    help: "ヘルプ",

    // Controls
    autoRotate: "自動回転",
    stop: "停止",
    rotate: "回転",
    lock: "ロック",
    unlock: "アンロック",
    performance: "パフォーマンス",
    quality: "品質",
    fastMode: "高速モード",
    qualityMode: "品質モード",
    iterations: "反復回数",
    pointSize: "ポイントサイズ",
    opacity: "不透明度",
    gamma: "ガンマ",
    intensity: "強度",
    backgroundColor: "背景色",

    // Matrix Editor
    matrixInput: "マトリックス入力",
    addMatrix: "マトリックス追加",
    probability: "確率",
    color: "色",
    enabled: "有効",

    // Export
    exportPNG: "PNG エクスポート",
    exportPLY: "PLY エクスポート",
    exportJSON: "JSON エクスポート",
    highQualityRender: "高品質レンダリング",
    exitRenderMode: "レンダリングモード終了",
    renderModeActive: "レンダリングモードがアクティブです。クリック、ドラッグ、またはズームで終了します。",

    // Presets
    fractalPresets: "フラクタルプリセット",
    loadFractal: "フラクタル読み込み",
    difficulty: "難易度",
    easy: "簡単",
    medium: "中級",
    hard: "上級",
    transformations: "変換",

    // Help
    helpTitle: "ユーザーガイド",
    basics: "基本",
    advanced: "上級",
    keyboardShortcuts: "キーボードショートカット",
    whatIsIFS: "IFS 3D アトラクターとは？",
    ifsDescription:
      "IFS（反復関数系）は、複数の線形変換を繰り返し適用してフラクタルを作成する方法です。このアプリケーションでは、美しい3Dフラクタルを作成・探索できます。",
    basicSteps: "基本手順：",
    step1: "1. フラクタルプリセットを選択",
    step1Description: "プリセットボタンをクリックしてフラクタルプリセットパネルを開き、プリセットを選択します。",
    step2: "2. フラクタルを生成",
    step2Description: "生成ボタンをクリックして選択したマトリックスからフラクタルを作成します。",
    step3: "3. フラクタルを探索",
    step3Description: "マウスを使って回転、ズーム、または画面左側の視点ボタンを使用します。",

    // Performance
    performanceWarning: "高い反復回数は遅延を引き起こす可能性があります",
    optimizeForPerformance: "パフォーマンス最適化",
    performanceStats: "パフォーマンス統計",
    points: "ポイント",
    functions: "関数",
    optimal: "最適",
    good: "良好",
    heavy: "重い",

    // Messages
    generating: "フラクタル生成中...",
    pleaseWait: "しばらくお待ちください",
    exportSuccess: "エクスポート成功！",
    importSuccess: "インポート成功！",
    error: "エラー",
    noMatrices: "マトリックスが定義されていません。",
    addMatrixToStart: '"マトリックス追加"をクリックしてIFSアトラクターの作成を開始してください。',

    // PLY Export specific
    pointDensity: "ポイント密度",
    meshQuality: "メッシュ品質",
    previewQuality: "プレビュー/ドラフト",
    standardQuality: "標準品質",
    highQuality: "高品質",
    ultraQuality: "超高品質",
    customQuality: "カスタム",
    totalPoints: "総ポイント数",
    exportPoints: "エクスポートポイント",
    samplingRatio: "サンプリング比率",
    estimatedSize: "推定サイズ",
    meshRecommendations: "メッシュ生成推奨事項",
    recommendedAlgorithms: "推奨アルゴリズム",
    suitableFor: "適用対象",
    softwareCompatibility: "ソフトウェア互換性",
    meshGenerationSoftware: "メッシュ生成ソフトウェア",
    threeDSoftwareImport: "3Dソフトウェアインポート",
    highPointCountWarning: "高ポイント数警告",
    exportPointsButton: "{count} ポイントをエクスポート",
  },

  ko: {
    // Common
    loading: "로딩 중",
    generate: "생성",
    export: "내보내기",
    import: "가져오기",
    reset: "재설정",
    close: "닫기",
    save: "저장",
    cancel: "취소",
    delete: "삭제",
    copy: "복사",

    // App Title
    appTitle: "IFS 3D 어트랙터",
    appSubtitle: "3D 프랙탈 세계 탐험",

    // Navigation
    presets: "프리셋",
    controls: "컨트롤",
    formulas: "공식",
    matrix: "매트릭스",
    json: "JSON",
    help: "도움말",

    // Controls
    autoRotate: "자동 회전",
    stop: "정지",
    rotate: "회전",
    lock: "잠금",
    unlock: "잠금 해제",
    performance: "성능",
    quality: "품질",
    fastMode: "빠른 모드",
    qualityMode: "품질 모드",
    iterations: "반복 횟수",
    pointSize: "점 크기",
    opacity: "불투명도",
    gamma: "감마",
    intensity: "강도",
    backgroundColor: "배경색",

    // Matrix Editor
    matrixInput: "매트릭스 입력",
    addMatrix: "매트릭스 추가",
    probability: "확률",
    color: "색상",
    enabled: "활성화",

    // Export
    exportPNG: "PNG 내보내기",
    exportPLY: "PLY 내보내기",
    exportJSON: "JSON 내보내기",
    highQualityRender: "고품질 렌더링",
    exitRenderMode: "렌더링 모드 종료",
    renderModeActive: "렌더링 모드가 활성화되었습니다. 클릭, 드래그 또는 줌으로 종료하세요.",

    // Presets
    fractalPresets: "프랙탈 프리셋",
    loadFractal: "프랙탈 로드",
    difficulty: "난이도",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    transformations: "변환",

    // Help
    helpTitle: "사용자 가이드",
    basics: "기본",
    advanced: "고급",
    keyboardShortcuts: "키보드 단축키",
    whatIsIFS: "IFS 3D 어트랙터란?",
    ifsDescription:
      "IFS(반복 함수 시스템)는 여러 선형 변환을 반복적으로 적용하여 프랙탈을 생성하는 방법입니다. 이 애플리케이션을 통해 아름다운 3D 프랙탈을 생성하고 탐험할 수 있습니다.",
    basicSteps: "기본 단계:",
    step1: "1. 프랙탈 프리셋 선택",
    step1Description: "프리셋 버튼을 클릭하여 프랙탈 프리셋 패널을 열고 프리셋을 선택하세요.",
    step2: "2. 프랙탈 생성",
    step2Description: "생성 버튼을 클릭하여 선택한 매트릭스에서 프랙탈을 생성하세요.",
    step3: "3. 프랙탈 탐험",
    step3Description: "마우스를 사용하여 회전, 줌하거나 화면 왼쪽의 시점 버튼을 사용하세요.",

    // Performance
    performanceWarning: "높은 반복 횟수는 지연을 일으킬 수 있습니다",
    optimizeForPerformance: "성능 최적화",
    performanceStats: "성능 통계",
    points: "점",
    functions: "함수",
    optimal: "최적",
    good: "좋음",
    heavy: "무거움",

    // Messages
    generating: "프랙탈 생성 중...",
    pleaseWait: "잠시만 기다려주세요",
    exportSuccess: "내보내기 성공!",
    importSuccess: "가져오기 성공!",
    error: "오류",
    noMatrices: "정의된 매트릭스가 없습니다.",
    addMatrixToStart: '"매트릭스 추가"를 클릭하여 IFS 어트랙터 생성을 시작하세요.',

    // PLY Export specific
    pointDensity: "점 밀도",
    meshQuality: "메시 품질",
    previewQuality: "미리보기/초안",
    standardQuality: "표준 품질",
    highQuality: "고품질",
    ultraQuality: "초고품질",
    customQuality: "사용자 정의",
    totalPoints: "총 점 수",
    exportPoints: "내보낼 점 수",
    samplingRatio: "샘플링 비율",
    estimatedSize: "예상 크기",
    meshRecommendations: "메시 생성 권장사항",
    recommendedAlgorithms: "권장 알고리즘",
    suitableFor: "적합한 용도",
    softwareCompatibility: "소프트웨어 호환성",
    meshGenerationSoftware: "메시 생성 소프트웨어",
    threeDSoftwareImport: "3D 소프트웨어 가져오기",
    highPointCountWarning: "높은 점 수 경고",
    exportPointsButton: "{count}개 점 내보내기",
  },

  es: {
    // Common
    loading: "Cargando",
    generate: "Generar",
    export: "Exportar",
    import: "Importar",
    reset: "Restablecer",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    copy: "Copiar",

    // App Title
    appTitle: "IFS 3D Atractor",
    appSubtitle: "Explora el mundo de los fractales 3D",

    // Navigation
    presets: "Preajustes",
    controls: "Controles",
    formulas: "Fórmulas",
    matrix: "Matriz",
    json: "JSON",
    help: "Ayuda",

    // Controls
    autoRotate: "Rotación automática",
    stop: "Detener",
    rotate: "Rotar",
    lock: "Bloquear",
    unlock: "Desbloquear",
    performance: "Rendimiento",
    quality: "Calidad",
    fastMode: "Modo rápido",
    qualityMode: "Modo de calidad",
    iterations: "Iteraciones",
    pointSize: "Tamaño de punto",
    opacity: "Opacidad",
    gamma: "Gamma",
    intensity: "Intensidad",
    backgroundColor: "Color de fondo",

    // Matrix Editor
    matrixInput: "Entrada de matriz",
    addMatrix: "Agregar matriz",
    probability: "Probabilidad",
    color: "Color",
    enabled: "Habilitado",

    // Export
    exportPNG: "Exportar PNG",
    exportPLY: "Exportar PLY",
    exportJSON: "Exportar JSON",
    highQualityRender: "Renderizado de alta calidad",
    exitRenderMode: "Salir del modo de renderizado",
    renderModeActive: "Modo de renderizado activo. Haz clic, arrastra o zoom para salir.",

    // Presets
    fractalPresets: "Preajustes de fractales",
    loadFractal: "Cargar fractal",
    difficulty: "Dificultad",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    transformations: "transformaciones",

    // Help
    helpTitle: "Guía del usuario",
    basics: "Básicos",
    advanced: "Avanzado",
    keyboardShortcuts: "Atajos de teclado",
    whatIsIFS: "¿Qué es IFS 3D Atractor?",
    ifsDescription:
      "IFS (Sistema de Funciones Iteradas) es un método para crear fractales aplicando repetidamente múltiples transformaciones lineales. Esta aplicación te permite crear y explorar hermosos fractales 3D.",
    basicSteps: "Pasos básicos:",
    step1: "1. Elegir un preajuste de fractal",
    step1Description:
      "Haz clic en el botón Preajustes para abrir el panel de Preajustes de Fractales y seleccionar un preajuste.",
    step2: "2. Generar fractal",
    step2Description: "Haz clic en el botón Generar para crear un fractal a partir de las matrices seleccionadas.",
    step3: "3. Explorar fractal",
    step3Description:
      "Usa el ratón para rotar, hacer zoom, o usa los botones de ángulo de vista en el lado izquierdo de la pantalla.",

    // Performance
    performanceWarning: "Un alto número de iteraciones puede causar retraso",
    optimizeForPerformance: "Optimizar para rendimiento",
    performanceStats: "Estadísticas de rendimiento",
    points: "Puntos",
    functions: "Funciones",
    optimal: "Óptimo",
    good: "Bueno",
    heavy: "Pesado",

    // Messages
    generating: "Generando fractal...",
    pleaseWait: "Por favor espera un momento",
    exportSuccess: "¡Exportación exitosa!",
    importSuccess: "¡Importación exitosa!",
    error: "Error",
    noMatrices: "No hay matrices definidas.",
    addMatrixToStart: 'Haz clic en "Agregar matriz" para comenzar a crear tu atractor IFS.',

    // PLY Export specific
    pointDensity: "Densidad de puntos",
    meshQuality: "Calidad de malla",
    previewQuality: "Vista previa/Borrador",
    standardQuality: "Calidad estándar",
    highQuality: "Alta calidad",
    ultraQuality: "Calidad ultra alta",
    customQuality: "Personalizado",
    totalPoints: "Puntos totales",
    exportPoints: "Puntos de exportación",
    samplingRatio: "Relación de muestreo",
    estimatedSize: "Tamaño estimado",
    meshRecommendations: "Recomendaciones de generación de malla",
    recommendedAlgorithms: "Algoritmos recomendados",
    suitableFor: "Adecuado para",
    softwareCompatibility: "Compatibilidad de software",
    meshGenerationSoftware: "Software de generación de malla",
    threeDSoftwareImport: "Importación de software 3D",
    highPointCountWarning: "Advertencia de alto número de puntos",
    exportPointsButton: "Exportar {count} puntos",
  },

  fr: {
    // Common
    loading: "Chargement",
    generate: "Générer",
    export: "Exporter",
    import: "Importer",
    reset: "Réinitialiser",
    close: "Fermer",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    copy: "Copier",

    // App Title
    appTitle: "IFS 3D Attracteur",
    appSubtitle: "Explorez le monde des fractales 3D",

    // Navigation
    presets: "Préréglages",
    controls: "Contrôles",
    formulas: "Formules",
    matrix: "Matrice",
    json: "JSON",
    help: "Aide",

    // Controls
    autoRotate: "Rotation automatique",
    stop: "Arrêter",
    rotate: "Tourner",
    lock: "Verrouiller",
    unlock: "Déverrouiller",
    performance: "Performance",
    quality: "Qualité",
    fastMode: "Mode rapide",
    qualityMode: "Mode qualité",
    iterations: "Itérations",
    pointSize: "Taille du point",
    opacity: "Opacité",
    gamma: "Gamma",
    intensity: "Intensité",
    backgroundColor: "Couleur de fond",

    // Matrix Editor
    matrixInput: "Saisie de matrice",
    addMatrix: "Ajouter une matrice",
    probability: "Probabilité",
    color: "Couleur",
    enabled: "Activé",

    // Export
    exportPNG: "Exporter PNG",
    exportPLY: "Exporter PLY",
    exportJSON: "Exporter JSON",
    highQualityRender: "Rendu haute qualité",
    exitRenderMode: "Quitter le mode rendu",
    renderModeActive: "Mode rendu actif. Cliquez, faites glisser ou zoomez pour quitter.",

    // Presets
    fractalPresets: "Préréglages de fractales",
    loadFractal: "Charger la fractale",
    difficulty: "Difficulté",
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    transformations: "transformations",

    // Help
    helpTitle: "Guide utilisateur",
    basics: "Bases",
    advanced: "Avancé",
    keyboardShortcuts: "Raccourcis clavier",
    whatIsIFS: "Qu'est-ce que IFS 3D Attracteur ?",
    ifsDescription:
      "IFS (Système de Fonctions Itérées) est une méthode pour créer des fractales en appliquant de manière répétée plusieurs transformations linéaires. Cette application vous permet de créer et d'explorer de belles fractales 3D.",
    basicSteps: "Étapes de base :",
    step1: "1. Choisir un préréglage de fractale",
    step1Description:
      "Cliquez sur le bouton Préréglages pour ouvrir le panneau Préréglages de Fractales et sélectionner un préréglage.",
    step2: "2. Générer la fractale",
    step2Description: "Cliquez sur le bouton Générer pour créer une fractale à partir des matrices sélectionnées.",
    step3: "3. Explorer la fractale",
    step3Description:
      "Utilisez la souris pour faire tourner, zoomer, ou utilisez les boutons d'angle de vue sur le côté gauche de l'écran.",

    // Performance
    performanceWarning: "Un nombre élevé d'itérations peut causer des ralentissements",
    optimizeForPerformance: "Optimiser pour la performance",
    performanceStats: "Statistiques de performance",
    points: "Points",
    functions: "Fonctions",
    optimal: "Optimal",
    good: "Bon",
    heavy: "Lourd",

    // Messages
    generating: "Génération de la fractale...",
    pleaseWait: "Veuillez patienter un moment",
    exportSuccess: "Exportation réussie !",
    importSuccess: "Importation réussie !",
    error: "Erreur",
    noMatrices: "Aucune matrice définie.",
    addMatrixToStart: 'Cliquez sur "Ajouter une matrice" pour commencer à créer votre attracteur IFS.',

    // PLY Export specific
    pointDensity: "Densité de points",
    meshQuality: "Qualité du maillage",
    previewQuality: "Aperçu/Brouillon",
    standardQuality: "Qualité standard",
    highQuality: "Haute qualité",
    ultraQuality: "Qualité ultra haute",
    customQuality: "Personnalisé",
    totalPoints: "Points totaux",
    exportPoints: "Points d'exportation",
    samplingRatio: "Ratio d'échantillonnage",
    estimatedSize: "Taille estimée",
    meshRecommendations: "Recommandations de génération de maillage",
    recommendedAlgorithms: "Algorithmes recommandés",
    suitableFor: "Convient pour",
    softwareCompatibility: "Compatibilité logicielle",
    meshGenerationSoftware: "Logiciel de génération de maillage",
    threeDSoftwareImport: "Importation de logiciel 3D",
    highPointCountWarning: "Avertissement de nombre élevé de points",
    exportPointsButton: "Exporter {count} points",
  },

  de: {
    // Common
    loading: "Laden",
    generate: "Generieren",
    export: "Exportieren",
    import: "Importieren",
    reset: "Zurücksetzen",
    close: "Schließen",
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    copy: "Kopieren",

    // App Title
    appTitle: "IFS 3D Attraktor",
    appSubtitle: "Erkunde die Welt der 3D-Fraktale",

    // Navigation
    presets: "Voreinstellungen",
    controls: "Steuerung",
    formulas: "Formeln",
    matrix: "Matrix",
    json: "JSON",
    help: "Hilfe",

    // Controls
    autoRotate: "Automatische Rotation",
    stop: "Stoppen",
    rotate: "Drehen",
    lock: "Sperren",
    unlock: "Entsperren",
    performance: "Leistung",
    quality: "Qualität",
    fastMode: "Schneller Modus",
    qualityMode: "Qualitätsmodus",
    iterations: "Iterationen",
    pointSize: "Punktgröße",
    opacity: "Deckkraft",
    gamma: "Gamma",
    intensity: "Intensität",
    backgroundColor: "Hintergrundfarbe",

    // Matrix Editor
    matrixInput: "Matrix-Eingabe",
    addMatrix: "Matrix hinzufügen",
    probability: "Wahrscheinlichkeit",
    color: "Farbe",
    enabled: "Aktiviert",

    // Export
    exportPNG: "PNG exportieren",
    exportPLY: "PLY exportieren",
    exportJSON: "JSON exportieren",
    highQualityRender: "Hochqualitäts-Rendering",
    exitRenderMode: "Render-Modus verlassen",
    renderModeActive: "Render-Modus aktiv. Klicken, ziehen oder zoomen zum Verlassen.",

    // Presets
    fractalPresets: "Fraktal-Voreinstellungen",
    loadFractal: "Fraktal laden",
    difficulty: "Schwierigkeit",
    easy: "Einfach",
    medium: "Mittel",
    hard: "Schwer",
    transformations: "Transformationen",

    // Help
    helpTitle: "Benutzerhandbuch",
    basics: "Grundlagen",
    advanced: "Erweitert",
    keyboardShortcuts: "Tastenkürzel",
    whatIsIFS: "Was ist IFS 3D Attraktor?",
    ifsDescription:
      "IFS (Iteriertes Funktionssystem) ist eine Methode zur Erstellung von Fraktalen durch wiederholte Anwendung mehrerer linearer Transformationen. Diese Anwendung ermöglicht es Ihnen, schöne 3D-Fraktale zu erstellen und zu erkunden.",
    basicSteps: "Grundlegende Schritte:",
    step1: "1. Fraktal-Voreinstellung wählen",
    step1Description:
      "Klicken Sie auf die Voreinstellungen-Schaltfläche, um das Fraktal-Voreinstellungen-Panel zu öffnen und eine Voreinstellung auszuwählen.",
    step2: "2. Fraktal generieren",
    step2Description:
      "Klicken Sie auf die Generieren-Schaltfläche, um ein Fraktal aus den ausgewählten Matrizen zu erstellen.",
    step3: "3. Fraktal erkunden",
    step3Description:
      "Verwenden Sie die Maus zum Drehen, Zoomen oder verwenden Sie die Blickwinkel-Schaltflächen auf der linken Seite des Bildschirms.",

    // Performance
    performanceWarning: "Hohe Iterationszahl kann Verzögerungen verursachen",
    optimizeForPerformance: "Für Leistung optimieren",
    performanceStats: "Leistungsstatistiken",
    points: "Punkte",
    functions: "Funktionen",
    optimal: "Optimal",
    good: "Gut",
    heavy: "Schwer",

    // Messages
    generating: "Fraktal wird generiert...",
    pleaseWait: "Bitte warten Sie einen Moment",
    exportSuccess: "Export erfolgreich!",
    importSuccess: "Import erfolgreich!",
    error: "Fehler",
    noMatrices: "Keine Matrizen definiert.",
    addMatrixToStart: 'Klicken Sie auf "Matrix hinzufügen", um mit der Erstellung Ihres IFS-Attraktors zu beginnen.',

    // PLY Export specific
    pointDensity: "Punktdichte",
    meshQuality: "Mesh-Qualität",
    previewQuality: "Vorschau/Entwurf",
    standardQuality: "Standardqualität",
    highQuality: "Hohe Qualität",
    ultraQuality: "Ultra-hohe Qualität",
    customQuality: "Benutzerdefiniert",
    totalPoints: "Gesamtpunkte",
    exportPoints: "Exportpunkte",
    samplingRatio: "Sampling-Verhältnis",
    estimatedSize: "Geschätzte Größe",
    meshRecommendations: "Mesh-Generierungsempfehlungen",
    recommendedAlgorithms: "Empfohlene Algorithmen",
    suitableFor: "Geeignet für",
    softwareCompatibility: "Software-Kompatibilität",
    meshGenerationSoftware: "Mesh-Generierungssoftware",
    threeDSoftwareImport: "3D-Software-Import",
    highPointCountWarning: "Warnung bei hoher Punktzahl",
    exportPointsButton: "{count} Punkte exportieren",
  },

  ru: {
    // Common
    loading: "Загрузка",
    generate: "Генерировать",
    export: "Экспорт",
    import: "Импорт",
    reset: "Сброс",
    close: "Закрыть",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    copy: "Копировать",

    // App Title
    appTitle: "IFS 3D Аттрактор",
    appSubtitle: "Исследуйте мир 3D фракталов",

    // Navigation
    presets: "Пресеты",
    controls: "Управление",
    formulas: "Формулы",
    matrix: "Матрица",
    json: "JSON",
    help: "Помощь",

    // Controls
    autoRotate: "Автоповорот",
    stop: "Стоп",
    rotate: "Поворот",
    lock: "Заблокировать",
    unlock: "Разблокировать",
    performance: "Производительность",
    quality: "Качество",
    fastMode: "Быстрый режим",
    qualityMode: "Режим качества",
    iterations: "Итерации",
    pointSize: "Размер точки",
    opacity: "Прозрачность",
    gamma: "Гамма",
    intensity: "Интенсивность",
    backgroundColor: "Цвет фона",

    // Matrix Editor
    matrixInput: "Ввод матрицы",
    addMatrix: "Добавить матрицу",
    probability: "Вероятность",
    color: "Цвет",
    enabled: "Включено",

    // Export
    exportPNG: "Экспорт PNG",
    exportPLY: "Экспорт PLY",
    exportJSON: "Экспорт JSON",
    highQualityRender: "Высококачественный рендер",
    exitRenderMode: "Выйти из режима рендера",
    renderModeActive: "Режим рендера активен. Кликните, перетащите или масштабируйте для выхода.",

    // Presets
    fractalPresets: "Пресеты фракталов",
    loadFractal: "Загрузить фрактал",
    difficulty: "Сложность",
    easy: "Легко",
    medium: "Средне",
    hard: "Сложно",
    transformations: "преобразования",

    // Help
    helpTitle: "Руководство пользователя",
    basics: "Основы",
    advanced: "Продвинутый",
    keyboardShortcuts: "Горячие клавиши",
    whatIsIFS: "Что такое IFS 3D Аттрактор?",
    ifsDescription:
      "IFS (Итерированная Функциональная Система) - это метод создания фракталов путем многократного применения нескольких линейных преобразований. Это приложение позволяет создавать и исследовать красивые 3D фракталы.",
    basicSteps: "Основные шаги:",
    step1: "1. Выберите пресет фрактала",
    step1Description: "Нажмите кнопку Пресеты, чтобы открыть панель Пресетов Фракталов и выбрать пресет.",
    step2: "2. Генерируйте фрактал",
    step2Description: "Нажмите кнопку Генерировать, чтобы создать фрактал из выбранных матриц.",
    step3: "3. Исследуйте фрактал",
    step3Description:
      "Используйте мышь для поворота, масштабирования или используйте кнопки угла обзора слева на экране.",

    // Performance
    performanceWarning: "Большое количество итераций может вызвать задержки",
    optimizeForPerformance: "Оптимизировать для производительности",
    performanceStats: "Статистика производительности",
    points: "Точки",
    functions: "Функции",
    optimal: "Оптимально",
    good: "Хорошо",
    heavy: "Тяжело",

    // Messages
    generating: "Генерация фрактала...",
    pleaseWait: "Пожалуйста, подождите",
    exportSuccess: "Экспорт успешен!",
    importSuccess: "Импорт успешен!",
    error: "Ошибка",
    noMatrices: "Матрицы не определены.",
    addMatrixToStart: 'Нажмите "Добавить матрицу", чтобы начать создание вашего IFS аттрактора.',

    // PLY Export specific
    pointDensity: "Плотность точек",
    meshQuality: "Качество сетки",
    previewQuality: "Предварительный просмотр/Черновик",
    standardQuality: "Стандартное качество",
    highQuality: "Высокое качество",
    ultraQuality: "Ультра высокое качество",
    customQuality: "Пользовательское",
    totalPoints: "Общее количество точек",
    exportPoints: "Экспортируемые точки",
    samplingRatio: "Коэффициент выборки",
    estimatedSize: "Предполагаемый размер",
    meshRecommendations: "Рекомендации по генерации сетки",
    recommendedAlgorithms: "Рекомендуемые алгоритмы",
    suitableFor: "Подходит для",
    softwareCompatibility: "Совместимость программного обеспечения",
    meshGenerationSoftware: "Программное обеспечение для генерации сетки",
    threeDSoftwareImport: "Импорт 3D программного обеспечения",
    highPointCountWarning: "Предупреждение о большом количестве точек",
    exportPointsButton: "Экспорт {count} точек",
  },
}
