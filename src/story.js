// Story graph for "The Last Signal".
// Each node has: id, chapter label, body paragraphs, and choices.
// A choice with no `next` ends the story (ending nodes set `ending: true`).

export const story = {
  start: {
    chapter: 'I — Static',
    body: [
      'Three years into a solo listening post at the edge of the Kessler Drift, you catch something in the noise floor that shouldn\u2019t be there: a pulse, evenly spaced, arriving from a star that finished dying eleven thousand years ago.',
      'The station\u2019s array can only hold a lock on it for another forty minutes before the drift carries you out of alignment. Command is nine hours away by light-relay, too slow to ask permission.',
    ],
    choices: [
      { label: 'Widen the array and chase the signal', next: 'widen' },
      { label: 'Log it quietly and wait for daylight orders', next: 'wait' },
    ],
  },

  widen: {
    chapter: 'II — Widening',
    body: [
      'You pull power from life support to push the array past its rated gain. The pulse sharpens into structure: not noise, but a pattern that repeats every 6.2 seconds, precise enough to be built rather than born.',
      'Twenty minutes of lock left. The pattern starts to resolve into something that looks almost like a language, if you had time to let the decoder run.',
    ],
    choices: [
      { label: 'Let the decoder run to completion', next: 'decode' },
      { label: 'Record raw and break the lock now, to be safe', next: 'record_raw' },
    ],
  },

  wait: {
    chapter: 'II — Restraint',
    body: [
      'You log the anomaly, timestamp it, and step back from the console. Whatever it is, it has waited eleven millennia; it can wait nine hours for someone with the authority to decide what happens next.',
      'The array drifts out of alignment forty minutes later, exactly on schedule. The signal is gone. You sleep, for the first time in days, without the hum of it in your ears.',
    ],
    choices: [
      { label: 'Send the log to Command and await orders', next: 'orders' },
    ],
  },

  decode: {
    chapter: 'III — Signal',
    body: [
      'The decoder finishes with four seconds of lock to spare. What comes through is not a greeting and not a warning \u2014 it is a set of coordinates, and beneath them, a single repeating fragment that the decoder marks, with 94% confidence, as a countdown.',
      'The array loses lock. The star goes quiet again, as it has been for eleven thousand years, except now you know it wasn\u2019t quiet at all \u2014 you just weren\u2019t listening.',
    ],
    ending: true,
    endingTitle: 'Ending — The Coordinates',
    endingBody:
      'You transmit the coordinates and the countdown to Command with your report. Whatever built that signal timed it to reach someone. It reached you.',
  },

  record_raw: {
    chapter: 'III — Caution',
    body: [
      'You break the lock at nineteen minutes, keeping the raw recording intact rather than risking a corrupted decode. It is the disciplined choice \u2014 the kind that keeps a listening post crew alive out here.',
      'Command\u2019s linguists will spend six months on the recording. You will never find out what they conclude; by the time they do, your rotation will have ended and you\u2019ll be three systems away.',
    ],
    ending: true,
    endingTitle: 'Ending — The Recording',
    endingBody:
      'You did the careful thing. The signal is safe, archived, and no longer yours. Some nights, on a different station, you still think you can hear it \u2014 6.2 seconds apart.',
  },

  orders: {
    chapter: 'III — Orders',
    body: [
      'Command\u2019s reply arrives nine hours later: reacquire and hold, full priority. But the drift has carried the station past the window. The alignment that gave you forty minutes will not come again for another eleven years.',
      'You file the coordinates of where the signal was, and when, and leave the rest to whoever holds this post in 2037.',
    ],
    ending: true,
    endingTitle: 'Ending — Eleven Years',
    endingBody:
      'You did everything by the book, and the book cost you the only window you had. The signal is now someone else\u2019s discovery to make \u2014 if the drift ever lines up again.',
  },
};

export const START_NODE = 'start';
