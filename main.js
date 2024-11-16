// 入力データをとってくる
// そのデータを配列として保存・データはローカルストレージへ
// そのメモを読み込んでくる
// それをHTMLに表示
// 要素の取得
const input = document.getElementById('memo-input');
const form = document.getElementById('memo-form');
const memoList = document.getElementById('memo-items');
const remove = document.getElementById('remove-button');

// メモを保持する配列
let memoArray = [];
const STORAGE_KEY = 'memos';

// ページ読み込み時の処理
window.onload = function () {
    // 保存されたメモを読み込む
    loadMemos();
}

// メモの読み込み
function loadMemos() {
    // ローカルストレージからデータを取得
    const savedMemos = localStorage.getItem(STORAGE_KEY);
    if (savedMemos) {
        // JSON形式の文字列を配列に変換
        memoArray = JSON.parse(savedMemos);
        // メモを画面に表示
        displayMemos();
    }
}

// メモの表示
function displayMemos() {
    // リストをクリアして１つずつ表示させる処理
    memoList.innerHTML = '';

    // for文で配列の要素を表示
    for (let i = 0; i < memoArray.length; i++) {
        const memo = memoArray[i];
        const li = document.createElement('li');
        li.textContent = memo.text;
        // liに追加
        memoList.appendChild(li);
    }
}

// フォームの送信処理
if (input) {
    form.addEventListener("submit", function (event) {
        // デフォルトの送信をキャンセル
        event.preventDefault();
        // 入力値を取得（前後の空白を削除）
        const inputValue = input.value.trim();

        // 入力値があれば処理を実行
        if (inputValue) {
            // 新しいメモを作成
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

            // メモを画面に表示
            displayMemos();

            // 確認用のログ
            console.log('メモを追加しました:', newMemo);
            console.log('現在のメモ一覧:', memoArray);
        }
    });
}

// 基本的な削除処理
function deleteMemo(index) {
    // 配列から要素を削除
    memoArray.splice(index, 1);
    // ローカルストレージを更新
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoArray));
    // 画面を更新
    displayMemos();
}

if (remove) {
    remove.addEventListener('click', function() {
        // 配列が空でない場合のみ削除を実行
        if (memoArray.length > 0) {
            // 最後の要素を削除
            deleteMemo(memoArray.length - 1);
            console.log('メモを削除しました');
            console.log('現在のメモ:', memoArray);
        }
    });
}
