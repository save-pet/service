import is from '@sindresorhus/is';

function checkEmpty(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error;
      } else {
        next();
      }
    } catch (error) {
      res.status(400).json({
        result: 'content-type error',
        reason: 'headers의 Content-Type을 application/json으로 설정해주세요',

      });
      // eslint-disable-next-line no-useless-return
      return;
    }
  
  };
  
  export { checkEmpty };