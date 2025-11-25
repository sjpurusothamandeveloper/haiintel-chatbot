// src/mockAiContent.js
export const MOCK_RESPONSES = [
  {
    id: 1,
    label: "what-is-haiintel",
    triggerKeywords: ["what is haiintel", "haiintel", "about you"],
    aiText:
      "HaiIntel partners with CIOs to embed human-rooted AI into enterprise transformation — focusing on intelligence-first systems that are domain aware and production ready.",
    suggestions: [
      "How do you work with CIOs?",
      "What makes HaiIntel different from typical software vendors?",
      "Tell me about your HaiPODs model"
    ]
  },
  {
    id: 2,
    label: "haipods",
    triggerKeywords: ["haipods", "pods", "engagement"],
    aiText:
      "HaiPODs are cross-functional pods that pair AI engineers with business stakeholders. They ship focused, high-impact AI use cases in weeks, not quarters.",
    suggestions: [
      "What kind of use cases do you typically deliver?",
      "How do you measure value from a HaiPOD?",
      "How do you handle data and security?"
    ]
  },
  {
    id: 3,
    label: "transformation",
    triggerKeywords: ["transformation", "enterprise", "strategy"],
    aiText:
      "We work with enterprises to move from experimentation to production AI — aligning architecture, UX, and governance so AI becomes a trusted part of day-to-day decision-making.",
    suggestions: [
      "Do you support existing cloud platforms?",
      "How do you work with in-house engineering teams?",
      "Can you share a typical engagement timeline?"
    ]
  }
];
