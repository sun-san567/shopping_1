// 入力データをとってくる
// そのデータを配列として保存・データはローカルストレージへ
// そのメモを読み込んでくる
// それをHTMLに表示

// 正しい実装

// 入力欄IDの取得
const input = document.getElementById('memo-input');
// フォームIDの取得
const form = document.getElementById('memo-form');

// メモを保持する配列
let memoArray = [];
const STORAGE_KEY = 'memos'; // ローカルストレージのキー

// 初期化：保存されたデータを読み込む
function initialize() {
    const savedMemos = localStorage.getItem(STORAGE_KEY);
    if (savedMemos) {
        memoArray = JSON.parse(savedMemos);
    }
}

// どちらもtrueであれば
if (form && input) {
    // 保存されたデータを読み込む
    initialize();

    form.addEventListener("submit", function(event) {
        // デフォルトの送信をキャンセル
        event.preventDefault();
        
        // 入力値を取得　trim()はスペースの削除
        const inputValue = input.value.trim();
        
        if (inputValue) {
            // 新しいメモオブジェクトを作成
            const newMemo = {
                id: Date.now(),
                text: inputValue,
                createdAt: new Date()
            };

            // 配列に追加
            memoArray.push(newMemo);

            // ローカルストレージに保存
            localStorage.setItem(STORAGE_KEY, JSON.stringify(memoArray));

            // 入力欄をクリア
            input.value = '';

            // 確認用（開発時に使用）
            console.log('現在のメモ:', memoArray);
            console.log(memoArray);
        }
    });
}