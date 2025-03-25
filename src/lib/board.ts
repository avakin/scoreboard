import { Match, Scores } from "./types";

export class ScoreBoard {
  private matches: Match[] = [];

  startMatch({ home, away }: { home: string; away: string }) {
    if (!home || !away) {
      console.error("Please provide home/away team names");
      return;
    }
    const startedMatch = {
      id: this.matches.length + 1,
      home,
      away,
      startedAt: new Date().valueOf(),
      finishedAt: null,
      scores: {
        home: 0,
        away: 0,
      },
    };

    this.matches.push(startedMatch);
  }

  updateMatch(id: number, scores: Scores) {
    const matchToUpdate = this.matches.find((el: Match) => el.id === id);

    if (!matchToUpdate) {
      console.error("No match found to update");
      return;
    }

    matchToUpdate.scores = scores;

    return matchToUpdate;
  }

  finishMatch(id: number) {
    const matchToFinish = this.matches.find((el: Match) => el.id === id);
    if (!matchToFinish) {
      console.error("No match found to finish");
      return;
    }

    matchToFinish.finishedAt = new Date().valueOf();

    return matchToFinish;
  }

  getSummary() {
    const ongoingMatches = this.matches.filter((el: Match) => !el.finishedAt);

    ongoingMatches.sort((a: Match, b: Match) => {
      const getSumOfScores = (match: Match) =>
        match.scores.home + match.scores.away;

      const sumA = getSumOfScores(a);
      const sumB = getSumOfScores(b);

      return sumA !== sumB ? sumB - sumA : b.startedAt - a.startedAt;
    });

    console.log(ongoingMatches);
    return ongoingMatches;
  }
  get summary() {
    return this.getSummary();
  }
}

export const Board = new ScoreBoard();

export default Board;
