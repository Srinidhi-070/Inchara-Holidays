import React, { useState } from 'react';
import { Language } from '../types';

interface PlannerTeaserProps {
  language: Language;
  onOpenPlanner: (initialRegion?: string) => void;
}

export const PlannerTeaser: React.FC<PlannerTeaserProps> = ({
  language,
  onOpenPlanner,
}) => {
  const [region, setRegion] = useState<string>('India');
  const kn = language === 'kn';

  const choices = [
    {
      id: 'Karnataka',
      labelKn: 'ಕರ್ನಾಟಕ',
      labelEn: 'Karnataka',
      sub: 'ಕರ್ನಾಟಕ',
    },
    {
      id: 'India',
      labelKn: 'ಭಾರತ (ಇತರ ರಾಜ್ಯಗಳು)',
      labelEn: 'India',
      sub: 'भारत',
    },
    {
      id: 'International',
      labelKn: 'ಅಂತರರಾಷ್ಟ್ರೀಯ',
      labelEn: 'International',
      sub: '✦',
    },
  ];

  const nextQuestions = kn
    ? [
        'ಯಾವ ತಿಂಗಳಲ್ಲಿ ಪ್ರಯಾಣಿಸಲು ಬಯಸುತ್ತೀರಿ?',
        'ಎಷ್ಟು ದಿನಗಳ ಪ್ರವಾಸ?',
        'ಯಾರು ಜೊತೆಗಿರುತ್ತಾರೆ?',
        'ಪ್ರಯಾಣದ ಶೈಲಿ?',
        'ಆತಿಥ್ಯ ಮತ್ತು ಬಜೆಟ್ ಆದ್ಯತೆ?',
      ]
    : [
        'When would you like to go?',
        'How many days?',
        'Who is travelling?',
        'Your travel style?',
        'Comfort preference?',
      ];

  return (
    <section className="planner section-pad" id="planner">
      <div className="planner-intro">
        <p className="section-label">
          <span>✦</span> {kn ? 'ನಿಮ್ಮ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭ' : 'YOUR JOURNEY STARTS HERE'}
        </p>
        <h2>
          {kn ? 'ನಿಮ್ಮ ಕನಸಿನ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಹೇಳಿ.' : 'Tell us what you’re dreaming of.'}
        </h2>
        <p lang="kn">{kn ? 'ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣವನ್ನು ಒಟ್ಟಿಗೆ ರೂಪಿಸೋಣ.' : 'Let us shape your next journey together.'}</p>
        <small>
          {kn
            ? 'ನಿಗದಿತ ಪ್ಯಾಕೇಜುಗಳಿಲ್ಲ. ಆರಂಭಿಸಲು ಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳು.'
            : 'No rigid packages. Just a few thoughtful questions to begin.'}
        </small>
      </div>

      <div className="planner-card">
        <div className="planner-progress">
          <span>{kn ? 'ಹಂತ ೦೧ / ೦೬' : 'STEP 01 OF 06'}</span>
          <div>
            <i />
          </div>
          <b>01</b>
        </div>

        <fieldset>
          <legend>
            {kn
              ? 'ನೀವು ಎಲ್ಲಿಗೆ ಪ್ರಯಾಣಿಸಲು ಬಯಸುತ್ತೀರಿ?'
              : 'Where would you like to travel?'}
          </legend>
          <p>
            {kn
              ? 'ಆರಂಭದ ತಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಉಳಿದುದನ್ನು ಒಟ್ಟಿಗೆ ನಿರ್ಧರಿಸೋಣ.'
              : 'Choose a starting point. We’ll narrow it down together.'}
          </p>

          <div className="choice-row">
            {choices.map((choice) => (
              <button
                className={region === choice.id ? 'selected' : ''}
                key={choice.id}
                onClick={() => setRegion(choice.id)}
                type="button"
              >
                <span>{choice.sub}</span>
                <strong>{kn ? choice.labelKn : choice.labelEn}</strong>
                <i>{region === choice.id ? '✓' : '○'}</i>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="next-questions">
          {nextQuestions.map((question, index) => (
            <span key={question}>
              0{index + 2} <i>{question}</i>
            </span>
          ))}
        </div>

        <div className="planner-actions">
          <small>
            {kn
              ? 'ಸಂವಾದಾತ್ಮಕ ಆಯ್ಕೆ · ನಿಮ್ಮ ವಿವರಗಳು ಇನ್ನೂ ಕಳುಹಿಸಿಲ್ಲ'
              : 'Preview interaction · Your choices are not submitted yet'}
          </small>
          <button
            type="button"
            className="button button-dark"
            onClick={() => onOpenPlanner(region)}
          >
            <span>{kn ? 'ಯೋಜನೆ ಮುಂದುವರಿಸಿ' : 'Continue planning'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
