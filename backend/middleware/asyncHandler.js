// asyncHandler関数：非同期関数（async関数）を扱うためのエラーハンドリングミドルウェア。
const asyncHandler = (fn) => (req, res, next) =>
  // fn関数（非同期処理）をPromiseとして実行し、成功した場合はそのまま処理を続ける。
  // 失敗（例外発生）した場合はcatchでエラーを補足し、next()を呼び出してExpressのエラーハンドリングへ渡す。
  Promise.resolve(fn(req, res, next)).catch(next);

// このasyncHandlerを他のモジュールで利用できるようにエクスポート
export default asyncHandler;
