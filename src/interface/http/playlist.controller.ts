import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { PlaylistUseCase } from "src/application/usecases/playlist.usecase";
import { PlaylistDTO } from "src/core/dto/playlist.dto";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { Video } from "src/infrastructure/db/schemas/video.schema";

@Controller('playlist')
export class PlaylistController {
    constructor(public readonly playlistUseCase: PlaylistUseCase) {}

    @Post('store')
    @UseGuards(JwtAuthGuard) 
    async store(@Req() req, @Body() body: { name: string, videos: Video[] }) {
        const user_id = req.user.id;
        const playlistDTO: PlaylistDTO = new PlaylistDTO(user_id, body.name, body.videos);
        return this.playlistUseCase.store(playlistDTO)
    }
}