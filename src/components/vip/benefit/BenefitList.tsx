import React from 'react';

interface BenefitListProps {
  benefits: string[];
  marker?: string;
}

const BenefitList: React.FC<BenefitListProps> = ({ benefits, marker = "⭐" }) => {
  return (
    <div className="benefits-list">
      {benefits.map((benefit, index) => (
        <div key={index} className="benefit-item">
          <span className="benefit-marker">{marker}</span>
          {benefit}
        </div>
      ))}
    </div>
  );
};

export default BenefitList;