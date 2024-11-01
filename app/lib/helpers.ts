"use client";

export function getRandomCharacter() {
  const wordStets = "abcdefghijklmnopqrstuvwxyz";

  return wordStets[Math.round(Math.random() * wordStets.length)];
}
