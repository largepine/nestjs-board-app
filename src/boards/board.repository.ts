import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  #boardRepository: Repository<Board>;

  constructor(private readonly dataSource: DataSource) {
    this.#boardRepository = this.dataSource.getRepository(Board);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.#boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.#boardRepository.save(board);
    return board;
  }

  async findOne(id: number) {
    return this.#boardRepository.findOneBy({ id });
  }
}
