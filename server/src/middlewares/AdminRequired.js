function adminRequired(req, res, next) {
    try {
      // role: "admin-user" 확인
      if (req.role === "admin-user") {
        next();
      } else {
        throw new Error;
      }
    } catch (error) {
      res.status(401).json({
        result: 'forbidden-approach',
        reason: '관리자만 접근 가능한 서비스입니다.',
      });
      // eslint-disable-next-line no-useless-return
      return;
    }
  
  };
  
  export { adminRequired };