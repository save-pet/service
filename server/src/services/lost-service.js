import { lostModel } from '../db/models/lost-model.js';

class LostService {
  constructor(lostModel) {
    this.lostModel = lostModel;
  }

  // 전체 분실 글 조회
  async getLosts() {
    const lostPosts = await this.lostModel.findAllLostPosts();
    // if (!lostPosts) {
    //   throw new Error('분실 게시글 목록이 존재하지 않습니다.');
    // }
    return lostPosts;
  }

  // 사용자가 작성한 분실 글 조회(목록 조회)
  async getLostByEmail(shortId) {
    const myLostPost = await this.lostModel.findById(shortId);
    return myLostPost;
  }

  // 게시글 shortId로 개별 분실 글 조회
  async getLostById(shortId) {
    const lostPost = await this.lostModel.findById(shortId);

    if (!lostPost) {
      throw new Error(
        '해당 글이 존재하지 않습니다. 게시글 id를 다시 확인해주세요.',
      );
    }
    return lostPost;
  }

  // 분실 글 추가
  async addLostPost(lostInfo) {
    const lost = await this.lostModel.create(lostInfo);

    if (!lost) {
      throw new Error('해당 게시글을 등록할 수 없습니다.');
    }

    return lost;
  }

  // 분실 게시글 수정
  async updateProduct(lostShortId, toUpdate) {
    let lost = await this.lostModel.findById(lostShortId);

    if (!lost) {
      throw new Error(
        '해당 게시글이 존재하지 않습니다. 게시글 id를 다시 확인해주세요.',
      );
    }

    lost = await this.lostModel.update({ lostShortId, update: toUpdate });

    return lost;
  }

  // 상품 정보 삭제
  // async deleteProduct(productId) {
  //   let product = await productModel.findById(productId);

  //   if (!product) {
  //     throw new CustomError(
  //       400,
  //       '해당 상품이 없습니다. 상품id를 다시 확인해주세요.',
  //     );
  //   }
  //   await this.productModel.delete(productId);
  //   return;
  // }
}

const lostService = new LostService(lostModel);

export { lostService };
