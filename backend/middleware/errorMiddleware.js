// 404エラー（リソースが見つからない場合）のためのミドルウェア関数
const notFound = (req, res, next) => {
  // リクエストされたURLが存在しない場合、エラーメッセージを作成し、そのエラーを次のミドルウェアに渡す
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // レスポンスのステータスコードを404に設定
  res.status(404);
  // エラーオブジェクトを次のエラーハンドラに渡す
  next(error);
};

// 全般的なエラーハンドリングミドルウェア
const errorHandler = (err, req, res, next) => {
  // もしレスポンスのステータスコードが200（成功）なら500（サーバーエラー）に変更
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongooseの「CastError」（オブジェクトIDが無効な場合）の場合、404エラーとして処理し、メッセージを変更
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // ステータスコードとエラーメッセージをJSON形式でレスポンスとして返す
  // 開発環境ではスタックトレースも含めるが、本番環境ではスタックトレースは含めない
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// ミドルウェア関数をエクスポートして、他のモジュールで使用できるようにする
export { notFound, errorHandler };
