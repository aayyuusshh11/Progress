# PROGRESS architecture

```text
PWA
├── Static knowledge
│   ├── 89 anatomy regions
│   ├── 38 exercises
│   ├── exercise → muscle coefficients
│   └── calculation rules
│
├── localStorage
│   ├── profile
│   ├── workouts
│   └── settings
│
└── calculation engine
    ├── Progress: volume / max / e1RM
    ├── Muscle: effective sets
    ├── This Week / This Month
    └── 0–10 load visualization
```

Raw workouts are stored. Derived analytics are calculated, so changing the analytics rules does not require rewriting workout history.
