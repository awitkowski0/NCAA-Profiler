import React from "react";
import { Box, Typography } from "@mui/material";
import { PlaySummary } from "../types/game";
import { PenaltyPlayer } from "../types/play";
import { Result, Summary } from "../types/play";

interface PlayDescriptionProps {
  playSummary: PlaySummary;
}

export const PlayDescription: React.FC<PlayDescriptionProps> = ({
  playSummary,
}) => {
  const play = playSummary.play;
  const result: Result | undefined = play?.result;
  const summary: Summary | undefined = play?.stats?.summary;

  const getPlayDescription = () => {
    if (!result) return "No play result available.";

    const {
      play_type_intent,
      penalty_player,
      penalty_type,
      play_success_outcome,
    } = result;

    const {
      passer,
      target,
      ball_carrier,
      result_yds,
      completion,
      yards_after_catch,
      yards_after_contact,
      sack_by,
      fumble_by,
      int_by,
      int_ret_yds,
      tackle_by,
      tackle_assist_by,
      turnover,
    } = summary || {};

    let description = "";

    // Start with play type and intent
    description += `Play: ${play_type_intent}. `;

    // Include key player actions (e.g., pass, run, sack)
    if (passer && target) {
      description += `Pass by ${passer.short_name} to ${target.short_name}`;
      if (completion) {
        description += `, completed for ${result_yds} yards`;
        if (yards_after_catch) {
          description += `, with ${yards_after_catch} yards after the catch`;
        }
      } else {
        description += `, incomplete`;
      }
      description += `. `;
    } else if (ball_carrier) {
      description += `${ball_carrier.short_name} carried the ball`;
      if (result_yds) {
        description += ` for ${result_yds} yards`;
      }
      if (yards_after_contact) {
        description += `, with ${yards_after_contact} yards after contact`;
      }
      description += `. `;
    }

    // Penalties
    if (penalty_player && penalty_type) {
      description += `Penalty on ${penalty_player.short_name} (${penalty_type}). `;
    }

    // Sack, fumble, interception
    if (sack_by) {
      description += `Sacked by ${sack_by.short_name}. `;
    }
    if (fumble_by) {
      description += `Fumble by ${fumble_by.short_name}. `;
    }
    if (int_by) {
      description += `Intercepted by ${int_by.short_name}`;
      if (int_ret_yds) {
        description += ` and returned for ${int_ret_yds} yards`;
      }
      description += `. `;
    }

    // Tackle information
    if (tackle_by) {
      description += `Tackled by ${tackle_by.short_name}`;
      if (tackle_assist_by && tackle_assist_by.length > 0) {
        const assistNames = tackle_assist_by.map((player: PenaltyPlayer) => player.short_name).join(", ");
        description += `, assisted by ${assistNames}`;
      }
      description += `. `;
    }

    // Turnover
    if (turnover) {
      description += `Turnover: ${turnover}. `;
    }

    // Success outcome
    description += `Play was ${play_success_outcome ? "successful" : "unsuccessful"}.`;

    return description;
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <Typography variant="body1">{getPlayDescription()}</Typography>
    </Box>
  );
};
