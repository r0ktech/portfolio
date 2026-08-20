"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

const COLS = 20;
const ROWS = 20;
const CELL = 18;
const TICK_MS = 130;
const HIGH_SCORE_KEY = "snake-high-score";

type Point = { x: number; y: number };

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function randomCell(exclude: Point[]): Point {
  let cell: Point;
  do {
    cell = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (exclude.some((p) => p.x === cell.x && p.y === cell.y));
  return cell;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }] as Point[],
    direction: { x: 1, y: 0 },
    pendingDirection: { x: 1, y: 0 },
    food: { x: 15, y: 10 } as Point,
    alive: true,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(HIGH_SCORE_KEY) ?? 0);
      if (!Number.isNaN(stored)) setHighScore(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      background: readToken("--color-background", "#fafafa"),
      border: readToken("--color-border", "#e4e4e7"),
      snake: readToken("--color-accent", "#2563eb"),
      food: readToken("--color-destructive", "#dc2626"),
    };

    function draw() {
      const s = stateRef.current;
      ctx!.fillStyle = colors.background;
      ctx!.fillRect(0, 0, COLS * CELL, ROWS * CELL);

      ctx!.strokeStyle = colors.border;
      ctx!.lineWidth = 1;
      for (let x = 0; x <= COLS; x++) {
        ctx!.beginPath();
        ctx!.moveTo(x * CELL + 0.5, 0);
        ctx!.lineTo(x * CELL + 0.5, ROWS * CELL);
        ctx!.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx!.beginPath();
        ctx!.moveTo(0, y * CELL + 0.5);
        ctx!.lineTo(COLS * CELL, y * CELL + 0.5);
        ctx!.stroke();
      }

      ctx!.fillStyle = colors.food;
      ctx!.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4);

      ctx!.fillStyle = colors.snake;
      s.snake.forEach((seg, i) => {
        const pad = i === 0 ? 1 : 2;
        ctx!.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
      });
    }

    function tick() {
      const s = stateRef.current;
      if (!s.alive || !s.started) return;

      s.direction = s.pendingDirection;
      const head = s.snake[0];
      const newHead = { x: head.x + s.direction.x, y: head.y + s.direction.y };

      const hitWall = newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS;
      const hitSelf = s.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y);

      if (hitWall || hitSelf) {
        s.alive = false;
        setGameOver(true);
        setHighScore((prev) => {
          const next = Math.max(prev, s.snake.length - 1);
          try {
            localStorage.setItem(HIGH_SCORE_KEY, String(next));
          } catch {
            // ignore
          }
          return next;
        });
        return;
      }

      s.snake = [newHead, ...s.snake];
      if (newHead.x === s.food.x && newHead.y === s.food.y) {
        setScore(s.snake.length - 1);
        s.food = randomCell(s.snake);
      } else {
        s.snake.pop();
      }
    }

    draw();
    const interval = setInterval(() => {
      tick();
      draw();
    }, TICK_MS);

    function handleKey(e: KeyboardEvent) {
      const s = stateRef.current;
      const key = e.key.toLowerCase();
      const moves: Record<string, Point> = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const move = moves[key];
      if (!move) return;
      e.preventDefault();

      if (!s.started) {
        s.started = true;
        setStarted(true);
      }
      // Ignore direct reversal into the snake's own neck.
      if (move.x === -s.direction.x && move.y === -s.direction.y) return;
      s.pendingDirection = move;
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  function move(dir: Point) {
    const s = stateRef.current;
    if (!s.started) {
      s.started = true;
      setStarted(true);
    }
    if (dir.x === -s.direction.x && dir.y === -s.direction.y) return;
    s.pendingDirection = dir;
  }

  function restart() {
    stateRef.current = {
      snake: [{ x: 10, y: 10 }],
      direction: { x: 1, y: 0 },
      pendingDirection: { x: 1, y: 0 },
      food: randomCell([{ x: 10, y: 10 }]),
      alive: true,
      started: false,
    };
    setScore(0);
    setGameOver(false);
    setStarted(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex w-full items-center justify-between font-[family-name:var(--font-heading)] text-sm text-[var(--color-foreground)]">
        <span>Bugs fixed: {score}</span>
        <span className="text-[var(--color-muted-foreground)]">Best: {highScore}</span>
      </div>

      <div className="relative w-[360px] max-w-full border border-[var(--color-border)]">
        <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} className="block h-auto w-full" />

        {!started && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/85 text-center text-sm text-[var(--color-muted-foreground)]">
            <p>
              Arrow keys or WASD
              <br />
              to start
            </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-background)]/90 text-center">
            <p className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--color-foreground)]">
              Game over
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {score} {score === 1 ? "bug" : "bugs"} fixed
            </p>
            <button
              type="button"
              onClick={restart}
              className="cursor-pointer border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1.5">
        <span />
        <button
          type="button"
          aria-label="Move up"
          onClick={() => move({ x: 0, y: -1 })}
          className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]"
        >
          <ArrowUp size={16} aria-hidden />
        </button>
        <span />
        <button
          type="button"
          aria-label="Move left"
          onClick={() => move({ x: -1, y: 0 })}
          className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]"
        >
          <ArrowLeft size={16} aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Move down"
          onClick={() => move({ x: 0, y: 1 })}
          className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]"
        >
          <ArrowDown size={16} aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Move right"
          onClick={() => move({ x: 1, y: 0 })}
          className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]"
        >
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
