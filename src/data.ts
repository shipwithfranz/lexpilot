import { WorkspaceDocument } from './types';

export const CONSTI_LAW_DOC: WorkspaceDocument = {
  id: 'consti-law-bill-of-rights',
  title: '1987 Constitution - Article III: Bill of Rights',
  subtitle: 'Constitutional Law Codal, Philippines',
  category: 'Statute',
  tag: 'CONSTI-III',
  content: `CONSTITUTION OF THE REPUBLIC OF THE PHILIPPINES
ARTICLE III — BILL OF RIGHTS

SECTION 1. No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws.

SECTION 2. The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable, and no search warrant or warrant of arrest shall issue except upon probable cause to be determined personally by the judge after examination under oath or affirmation of the complainant and the witnesses he may produce, and particularly describing the place to be searched and the persons or things to be seized.

SECTION 3. (1) The privacy of communication and correspondence shall be inviolable except upon lawful order of the court, or when public safety or order requires otherwise as prescribed by law.
(2) Any evidence obtained in violation of this or the preceding section shall be inadmissible for any purpose in any proceeding.

SECTION 4. No law shall be passed abridging the freedom of speech, of expression, or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances...`,
  highlights: [],
  sections: [
    {
      id: 'consti-sec-1',
      title: 'Section 1: Due Process & Equal Protection',
      text: 'No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws. This acts as the bedrock of constitutional protections, establishing both procedural and substantive limits on state power.'
    },
    {
      id: 'consti-sec-2',
      title: 'Section 2: Unreasonable Searches & Seizures',
      text: 'The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures shall be inviolable. Warrants must only issue upon probable cause personally determined by a judge.'
    },
    {
      id: 'consti-sec-3',
      title: 'Section 3: Privacy of Communication',
      text: '(1) The privacy of communication and correspondence shall be inviolable except upon lawful order of the court, or when public safety requires.\n(2) Any evidence obtained in violation of this is inadmissible (Fruit of the poisonous tree doctrine).'
    },
    {
      id: 'consti-sec-4',
      title: 'Section 4: Freedom of Speech and Assembly',
      text: 'No law shall be passed abridging the freedom of speech, of expression, or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances.'
    }
  ]
};

export const CRIMINAL_LAW_DOC: WorkspaceDocument = {
  id: 'criminal-law-justifying',
  title: 'Revised Penal Code - Article 11: Justifying Circumstances',
  subtitle: 'Criminal Law Codal, Philippines',
  category: 'Statute',
  tag: 'CRIM-ART-11',
  content: `REVISED PENAL CODE OF THE PHILIPPINES
ARTICLE 11 — JUSTIFYING CIRCUMSTANCES

The following do not incur any criminal liability:

1. Anyone who acts in defense of his person or rights, provided that the following circumstances concur:
   First. Unlawful aggression;
   Second. Reasonable necessity of the means employed to prevent or repel it;
   Third. Lack of sufficient provocation on the part of the person defending himself.

2. Anyone who acts in defense of the person or rights of his spouse, ascendants, descendants, or legitimate, natural or adopted brothers or sisters, or of his relatives by affinity in the same degrees, and those by consanguinity within the fourth civil degree, provided that the first and second requisites prescribed in the next preceding circumstance are present, and the further requisite, in case the provocation was given by the person attacked, that the one making defense had no part therein.

3. Anyone who acts in defense of the person or rights of a stranger, provided that the first and second requisites mentioned in circumstance No. 1 of this article are present and that the person defending be not induced by revenge, resentment, or other evil motive.

4. Any person who, in order to avoid an evil or injury, does an act which causes damage to another, provided that the following requisites are present:
   First. That the evil sought to be avoided actually exists;
   Second. That the injury feared be greater than that caused to avoid it;
   Third. That there be no other practical and less harmful means of preventing it.`,
  highlights: [],
  sections: [
    {
      id: 'crim-sec-self-defense',
      title: 'Article 11(1): Self-Defense',
      text: 'Anyone who acts in defense of his person or rights incurs no criminal liability, provided three elements concur:\n1. Unlawful aggression (an absolute prerequisite);\n2. Reasonable necessity of the means employed to prevent or repel it;\n3. Lack of sufficient provocation on the part of the person defending himself.'
    },
    {
      id: 'crim-sec-defense-relatives',
      title: 'Article 11(2): Defense of Relatives',
      text: 'Defense of spouse, ascendants, descendants, siblings, or relatives of consanguinity up to the 4th degree or affinity. Requires elements 1 (unlawful aggression) and 2 (reasonable necessity of means), plus that if provocation was given by the relative, the defender took no part.'
    },
    {
      id: 'crim-sec-avoid-evil',
      title: 'Article 11(4): State of Necessity',
      text: 'Avoidance of greater evil. Requisites:\n1. The evil sought to be avoided actually exists;\n2. The injury feared is greater than that caused to avoid it;\n3. No other practical and less harmful means exist.'
    }
  ]
};

export const LABOR_LAW_DOC: WorkspaceDocument = {
  id: 'labor-law-tenure',
  title: 'Labor Code - Book VI: Post-Employment & Security of Tenure',
  subtitle: 'Labor Law Codal, Philippines',
  category: 'Statute',
  tag: 'LABOR-BK-VI',
  content: `LABOR CODE OF THE PHILIPPINES
BOOK VI — POST-EMPLOYMENT

ART. 294. [279] Security of Tenure. — In cases of regular employment, the employer shall not terminate the services of an employee except for a just cause or when authorized by this Title. An employee who is unjustly dismissed from work shall be entitled to reinstatement without loss of seniority rights and other privileges and to his full backwages, inclusive of allowances, and to his other benefits or their monetary equivalent computed from the time his compensation was withheld from him up to the time of his actual reinstatement.

ART. 297. [282] Termination by Employer (Just Causes). — An employer may terminate an employment for any of the following causes:
(a) Serious misconduct or willful disobedience by the employee of the lawful orders of his employer or representative in connection with his work;
(b) Gross and habitual neglect by the employee of his duties;
(c) Fraud or willful breach by the employee of the trust reposed in him by his employer or duly authorized representative;
(d) Commission of a crime or offense by the employee against the person of his employer or any immediate member of his family or his duly authorized representatives; and
(e) Other causes analogous to the foregoing.

ART. 298. [283] Closure of Establishment and Reduction of Personnel (Authorized Causes). — The employer may also terminate the employment of any employee due to the installation of labor-saving devices, redundancy, retrenchment to prevent losses or the closing or cessation of operation of the establishment or undertaking...`,
  highlights: [],
  sections: [
    {
      id: 'labor-sec-security-of-tenure',
      title: 'Article 294: Security of Tenure',
      text: 'In regular employment, employers cannot terminate services except for just or authorized causes. Unjust dismissal entitles the employee to full reinstatement without loss of seniority, plus full backwages, allowances, and other benefits.'
    },
    {
      id: 'labor-sec-just-causes',
      title: 'Article 297: Just Causes for Termination',
      text: 'Just causes are employee-driven faults allowing immediate termination without reinstatement or separation pay (with due process):\n(a) Serious misconduct or willful disobedience;\n(b) Gross and habitual neglect;\n(c) Fraud or willful breach of trust;\n(d) Commission of a crime against employer or family;\n(e) Analogous causes.'
    },
    {
      id: 'labor-sec-authorized-causes',
      title: 'Article 298: Authorized Causes for Termination',
      text: 'Authorized causes are business-driven reasons requiring 30 days notice to the employee and DOLE, plus separation pay:\n(a) Installation of labor-saving devices;\n(b) Redundancy;\n(c) Retrenchment to prevent losses;\n(d) Closure or cessation of business operations.'
    }
  ]
};

export const SAMPLE_PROJECT_PLAN: WorkspaceDocument = {
  id: 'jg-summit-124293',
  title: 'G.R. No. 124293: JG Summit Holdings, Inc. v. Court of Appeals',
  subtitle: 'Supreme Court of the Philippines Decision (National Patrimony & Public Utilities)',
  category: 'Jurisprudence',
  tag: 'CONSTI-CASE',
  content: `G.R. No. 124293 | September 24, 2003
JG SUMMIT HOLDINGS, INC., Petitioner, vs. COURT OF APPEALS, Committee on Privatization, and Philyards Holdings, Inc., Respondents.

This landmark decision discusses the constitutional limitations on land-ownership and public utilities under Article XII of the 1987 Philippine Constitution. It examines whether a shipyard is a public utility that requires at least 60% Filipino ownership under Section 11, Article XII of the Constitution. The Supreme Court initially held that shipyards are public utilities. On a motion for reconsideration, the Court clarified that although shipyards are no longer certified as public utilities under modern deregulation statutory amendments, national patrimony provisions still demand deep scrutiny on foreign holdings. The core holding established that a right of first refusal or right to top a bid does not violate the Constitution if the ultimate foreign ownership cap is strictly maintained.`,
  highlights: [],
  sections: [
    {
      id: 'jg-holding',
      title: 'Core Constitutional Issue & Ruling',
      text: 'Whether shipyards are a public utility restricted by Section 11, Article XII of the 1987 Constitution. The Supreme Court ruled that a shipyard is not inherently a public utility under the deregulation guidelines, but any transaction must still respect the 40% foreign ownership constitutional ceiling.'
    },
    {
      id: 'jg-patrimony',
      title: 'Article XII Section 11 National Patrimony',
      text: 'No franchise, certificate, or any other form of authorization for the operation of a public utility shall be granted except to citizens of the Philippines or to corporations or associations organized under the laws of the Philippines, at least sixty per centum of whose capital is owned by such citizens.'
    }
  ]
};

export const SAMPLE_MEETING_NOTES: WorkspaceDocument = {
  id: 'serrano-167614',
  title: 'G.R. No. 167614: Serrano v. Gallant Maritime Services',
  subtitle: 'Supreme Court of the Philippines Decision (Labor Law & Equality Clause)',
  category: 'Jurisprudence',
  tag: 'LABOR-CASE',
  content: `G.R. No. 167614 | March 24, 2009
ANTONIO M. SERRANO, Petitioner, vs. GALLANT MARITIME SERVICES, INC. and MARLOW NAVIGATION CO., INC., Respondents.

This is a landmark Philippine Labor law case concerning equal protection and security of tenure for Overseas Filipino Workers (OFWs). The Supreme Court declared unconstitutional the clause "or for three (3) months for every year of the unexpired term, whichever is less" under Section 10 of Republic Act No. 8042 (Migrant Workers Act). The Court held that this clause violates Article III, Section 1 of the 1987 Constitution, creating an invalid, discriminatory classification between local regular employees and migrant workers, unfairly capping the backwages of unjustly term-terminated OFWs.`,
  highlights: [],
  sections: [
    {
      id: 'serrano-equal-protection',
      title: 'Equal Protection Violation',
      text: 'The clause limiting backwages to 3 months for unjustly dismissed OFWs violates the equal protection clause because it discriminates against OFWs without a rational basis compared to local workers who receive full backwages.'
    },
    {
      id: 'serrano-remedies',
      title: 'Remedies for Unjust Dismissal',
      text: 'OFWs who are unjustly dismissed are entitled to salaries for the unexpired portion of their employment contract in full, without any arbitrary 3-month wage cap.'
    }
  ]
};

export const CIVIL_LAW_DOC: WorkspaceDocument = {
  id: 'civil-law-human-relations',
  title: 'Civil Code - Chapter 2: Human Relations',
  subtitle: 'Civil Law Codal, Philippines',
  category: 'Statute',
  tag: 'CIVIL-HR',
  content: `CIVIL CODE OF THE PHILIPPINES
CHAPTER 2 — HUMAN RELATIONS

ART. 19. Every person must, in the exercise of his rights and in the performance of his duties, act with justice, give everyone his due, and observe honesty and good faith.

ART. 20. Every person who, contrary to law, willfully or negligently causes damage to another, shall indemnify the latter for the same.

ART. 21. Any person who willfully causes loss or injury to another in a manner that is contrary to morals, good customs or public policy shall compensate the latter for the damage.

ART. 22. Every person who through an act of performance by another, or any other means, acquires or comes into possession of something at the expense of the latter without just or legal ground, shall return the same to him.

ART. 26. Every person shall respect the dignity, personality, privacy and peace of mind of his neighbors and other persons. The following and similar acts, though they may not constitute a criminal offense, shall produce a cause of action for damages, prevention and other relief:
(1) Prying into the privacy of another's residence;
(2) Meddling with or disturbing the private life or family relations of another;
(3) Intriguing to cause another to be alienated from his friends;
(4) Vexing or humiliating another on account of his religious beliefs, lowly station in life, place of birth, physical defect, or other personal condition.`,
  highlights: [],
  sections: [
    {
      id: 'civil-sec-abuse-of-rights',
      title: 'Article 19: Abuse of Rights Doctrine',
      text: 'Every person must act with justice, give everyone his due, and observe honesty and good faith. This is the bedrock Abuse of Rights doctrine. It sets a limit on the exercise of legal rights; a right becomes actionable when exercised with bad faith or sole intent to prejudice another.'
    },
    {
      id: 'civil-sec-general-liability',
      title: 'Article 20: Liability for Illegal Acts',
      text: 'Every person who willfully or negligently causes damage contrary to law must indemnify the victim. This acts as the general sanction for violations of statutory rules that do not define specific penal consequences.'
    },
    {
      id: 'civil-sec-contrary-morals',
      title: 'Article 21: Acts Contrary to Morals',
      text: 'Willfully causing injury in a manner contrary to morals, good customs, or public policy requires compensation. This provides a legal remedy for moral wrongs and fills the void of statutory gaps (e.g., breach of promise to marry combined with fraud/disgrace, or malicious prosecution).'
    },
    {
      id: 'civil-sec-unjust-enrichment',
      title: 'Article 22: Unjust Enrichment',
      text: 'Unjust enrichment occurs when any person acquires something at the expense of another without a just or legal ground, imposing a strict obligation to return/restitute.'
    },
    {
      id: 'civil-sec-privacy-dignity',
      title: 'Article 26: Respect for Privacy and Dignity',
      text: 'Obligations to respect privacy, personality, and peace of mind. Specific violations include prying into residence, disturbing private life or family ties, provoking alienation, or humiliating someone based on personal conditions.'
    }
  ]
};

export const REMEDIAL_LAW_DOC: WorkspaceDocument = {
  id: 'court-rules-evidence',
  title: 'Rules of Court - Rule 130: Rules of Admissibility',
  subtitle: 'Remedial Law Codal (Evidence), Philippines',
  category: 'Statute',
  tag: 'RULES-130',
  content: `PHILIPPINE RULES OF COURT
REVISED RULES ON EVIDENCE (RULE 130)

SEC. 3. Original Document Rule (formerly Best Evidence Rule). — When the subject of inquiry is the contents of a document, writing, recording, photograph or other record, no evidence shall be admissible other than the original document itself, except in the following cases:
(a) When the original has been lost or destroyed, or cannot be produced in court, without bad faith on the part of the offeror;
(b) When the original is in the custody or under the control of the party against whom the evidence is offered, and the latter fails to produce it after reasonable notice;
(c) When the original consists of numerous accounts or other documents which cannot be examined in court without great loss of time, and the fact sought to be established from them is only the general result of the whole; and
(d) When the original is a public record in the custody of a public officer or is recorded in a public office.

SEC. 10. Parol Evidence Rule (Integration of Terms). — When the terms of an agreement have been reduced to writing, it is considered as containing all the terms agreed upon and there can be, between the parties and their successors in interest, no evidence of such terms other than the contents of the written agreement, except when a party puts in issue in his or her pleadings:
(a) An intrinsic ambiguity, mistake or imperfection in the written agreement;
(b) The failure of the written agreement to express the true intent and agreement of the parties thereto;
(c) The validity of the written agreement; or
(d) The existence of other terms agreed to by the parties or their successors in interest after the execution of the written agreement.

SEC. 36. Hearsay Rule. — A witness can testify only to those facts which he or she knows of his or her personal knowledge; that is, which are derived from his or her own perception, except as otherwise provided in these rules (such as dying declarations, declaration against interest, or part of res gestae).`,
  highlights: [],
  sections: [
    {
      id: 'evidence-sec-best-evidence',
      title: 'Rule 130, Section 3: Original Document Rule',
      text: 'If the subject of inquiry is the content of a record/document, the original must be presented. Secondary evidence (copy, oral testimony) is admissible only if: (a) lost/destroyed, (b) in adverse party custody, (c) voluminous records, or (d) public record.'
    },
    {
      id: 'evidence-sec-parol-evidence',
      title: 'Rule 130, Section 10: Parol Evidence Rule',
      text: 'Written agreements contain all integrated terms. No extrinsic oral/written terms before/during execution are allowed, except to resolve: (a) intrinsic ambiguity/imperfection, (b) failure to express true intent, (c) validity issues, or (d) subsequent terms.'
    },
    {
      id: 'evidence-sec-hearsay',
      title: 'Rule 130, Section 36: Hearsay and Exceptions',
      text: 'Hearsay rule dictates that witnesses must testify based on personal knowledge derived from actual perception. Common exceptions allowing hearsay include: (1) Dying Declarations (under belief of impending death); (2) Declarations Against Interest; (3) Res Gestae (spontaneous statements or verbal acts during/right after the startling occurrence).'
    }
  ]
};

export const PHIL_CONSTITUTION_COMPLETE_DOC: WorkspaceDocument = {
  id: 'ph-constitution-1987-complete',
  title: '1987 Constitution of the Republic of the Philippines',
  subtitle: 'Complete Constitutional Codal & Statutory Reference',
  category: 'Statute',
  tag: 'CONSTI-COMPLETE',
  content: `THE 1987 CONSTITUTION OF THE REPUBLIC OF THE PHILIPPINES

PREAMBLE
We, the sovereign Filipino people, imploring the aid of Almighty God, in order to build a just and humane society, and establish a Government that shall embody our ideals and aspirations, promote the common good, conserve and develop our patrimony, and secure to ourselves and our posterity, the blessings of independence and democracy under the rule of law and a regime of truth, justice, freedom, love, equality, and peace, do ordain and promulgate this Constitution.

ARTICLE I — NATIONAL TERRITORY
The national territory comprises the Philippine archipelago, with all the islands and waters embraced therein, and all other territories over which the Philippines has sovereignty or jurisdiction, consisting of its terrestrial, fluvial and aerial domains, including its territorial sea, the seabed, the subsoil, the insular shelves, and other submarine areas. The waters around, between, and connecting the islands of the archipelago, regardless of their breadth and dimensions, form part of the internal waters of the Philippines.

ARTICLE II — DECLARATION OF PRINCIPLES AND STATE POLICIES
PRINCIPLES
Section 1. The Philippines is a democratic and republican State. Sovereignty resides in the people and all government authority emanates from them.
Section 2. The Philippines renounces war as an instrument of national policy, adopts the generally accepted principles of international law as part of the law of the land and adheres to the policy of peace, equality, justice, freedom, cooperation, and amity with all nations.
Section 3. Civilian authority is, at all times, supreme over the military. The Armed Forces of the Philippines is the protector of the people and the State. Its goal is to secure the sovereignty of the State and the integrity of the national territory.
Section 4. The prime duty of the Government is to serve and protect the people. The Government may call upon the people to defend the State and, in the fulfillment thereof, all citizens may be required, under conditions provided by law, to render personal, military or civil service.
Section 5. The maintenance of peace and order, the protection of life, liberty, and property, and promotion of the general welfare are essential for the enjoyment by all the people of the blessings of democracy.
Section 6. The separation of Church and State shall be inviolable.

STATE POLICIES
Section 7. The State shall pursue an independent foreign policy. In its relations with other states, the paramount consideration shall be national sovereignty, territorial integrity, national interest, and the right to self-determination.
Section 8. The Philippines, consistent with the national interest, adopts and pursues a policy of freedom from nuclear weapons in its territory.
Section 9. The State shall promote a just and dynamic social order that will ensure the prosperity and independence of the nation and free the people from poverty through policies that provide adequate social services, promote full employment, a rising standard of living, and an improved quality of life for all.
Section 10. The State shall promote social justice in all phases of national development.
Section 11. The State values the dignity of every human person and guarantees full respect for human rights.
Section 12. The State recognizes the sanctity of family life and shall protect and strengthen the family as a basic autonomous social institution. It shall equally protect the life of the mother and the life of the unborn from conception. The natural and primary right and duty of parents in the rearing of the youth for civic efficiency and the development of moral character shall receive the support of the Government.
Section 13. The State recognizes the vital role of the youth in nation-building and shall promote and protect their physical, moral, spiritual, intellectual, and social well-being. It shall inculcate in the youth patriotism and nationalism, and encourage their involvement in public and civic affairs.
Section 14. The State recognizes the role of women in nation-building, and shall ensure the fundamental equality before the law of women and men.
Section 15. The State shall protect and promote the right to health of the people and instill health consciousness among them.
Section 16. The State shall protect and advance the right of the people to a balanced and healthful ecology in accord with the rhythm and harmony of nature.
Section 17. The State shall give priority to education, science and technology, arts, culture, and sports to foster patriotism and nationalism, accelerate social progress, and promote total human liberation and development.
Section 18. The State affirms labor as a primary social economic force. It shall protect the rights of workers and promote their welfare.
Section 19. The State shall develop a self-reliant and independent national economy effectively controlled by Filipinos.
Section 20. The State recognizes the indispensable role of the private sector, encourages private enterprise, and provides incentives to needed investments.
Section 21. The State shall promote comprehensive rural development and agrarian reform.
Section 22. The State recognizes and promotes the rights of indigenous cultural communities within the framework of national unity and development.
Section 23. The State shall encourage non-governmental, community-based, or sectoral organizations that promote the welfare of the nation.
Section 24. The State recognizes the vital role of communication and information in nation-building.
Section 25. The State shall ensure the autonomy of local governments.
Section 26. The State shall guarantee equal access to opportunities for public service, and prohibit political dynasties as may be defined by law.
Section 27. The State shall maintain honesty and integrity in the public service and take positive and effective measures against graft and corruption.
Section 28. Subject to reasonable conditions prescribed by law, the State adopts and implements a policy of full public disclosure of all its transactions involving public interest.

ARTICLE III — BILL OF RIGHTS
Section 1. No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws.
Section 2. The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable, and no search warrant or warrant of arrest shall issue except upon probable cause to be determined personally by the judge after examination under oath or affirmation of the complainant and the witnesses he may produce, and particularly describing the place to be searched and the persons or things to be seized.
Section 3. (1) The privacy of communication and correspondence shall be inviolable except upon lawful order of the court, or when public safety or order requires otherwise, as prescribed by law.
(2) Any evidence obtained in violation of this or the preceding section shall be inadmissible for any purpose in any proceeding.
Section 4. No law shall be passed abridging the freedom of speech, of expression, or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances.
Section 5. No law shall be made respecting an establishment of religion, or prohibiting the free exercise thereof. The free exercise and enjoyment of religious profession and worship, without discrimination or preference, shall forever be allowed. No religious test shall be required for the exercise of civil or political rights.
Section 6. The liberty of abode and of changing the same within the limits prescribed by law shall not be impaired except upon lawful order of the court. Neither shall the right to travel be impaired except in the interest of national security, public safety, or public health, as may be provided by law.
Section 7. The right of the people to information on matters of public concern shall be recognized. Access to official records, and to documents and papers pertaining to official acts, transactions, or decisions, as well as to government research data used as basis for policy development, shall be afforded the citizen, subject to such limitations as may be provided by law.
Section 8. The right of the people, including those employed in the public and private sectors, to form unions, associations, or societies for purposes not contrary to law shall not be abridged.
Section 9. Private property shall not be taken for public use without just compensation.
Section 10. No law impairing the obligation of contracts shall be passed.
Section 11. Free access to the courts and quasi-judicial bodies and adequate legal assistance shall not be denied to any person by reason of poverty.
Section 12. (1) Any person under investigation for the commission of an offense shall have the right to be informed of his right to remain silent and to have competent and independent counsel preferably of his own choice. If the person cannot afford the services of counsel, he must be provided with one. These rights cannot be waived except in writing and in the presence of counsel.
(2) No torture, force, violence, threat, intimidation, or any other means which vitiate the free will shall be used against him. Secret detention places, solitary, incommunicado, or other similar forms of detention are prohibited.
(3) Any confession or admission obtained in violation of this or Section 17 hereof shall be inadmissible in evidence against him.
(4) The law shall provide for penal and civil sanctions for violations of this section as well as compensation to and rehabilitation of victims of torture or similar practices, and their families.
Section 13. All persons, except those charged with offenses punishable by reclusion perpetua when evidence of guilt is strong, shall, before conviction, be bailable by sufficient sureties, or be released on recognizance as may be provided by law. The right to bail shall not be impaired even when the privilege of the writ of habeas corpus is suspended. Excessive bail shall not be required.
Section 14. (1) No person shall be held to answer for a criminal offense without due process of law.
(2) In all criminal prosecutions, the accused shall be presumed innocent until the contrary is proved, and shall enjoy the right to be heard by himself and counsel, to be informed of the nature and cause of the accusation against him, to have a speedy, impartial, and public trial, to meet the witnesses face to face, and to have compulsory process to secure the attendance of witnesses and the production of evidence in his behalf. However, after arraignment, trial may proceed notwithstanding the absence of the accused: Provided, that he has been duly notified and his failure to appear is unjustifiable.
Section 15. The privilege of the writ of habeas corpus shall not be suspended except in cases of invasion or rebellion, when the public safety requires it.
Section 16. All persons shall have the right to a speedy disposition of their cases before all judicial, quasi-judicial, or administrative bodies.
Section 17. No person shall be compelled to be a witness against himself.
Section 18. (1) No person shall be detained solely by reason of his political beliefs and aspirations.
(2) No involuntary servitude in any form shall exist except as a punishment for a crime whereof the party shall have been duly convicted.
Section 19. (1) Excessive fines shall not be imposed, nor cruel, degrading or inhuman punishment inflicted. Neither shall the death penalty be imposed, unless, for compelling reasons involving heinous crimes, the Congress hereafter provides for it. Any death penalty already imposed shall be reduced to reclusion perpetua.
(2) The employment of physical, psychological, or degrading punishment against any prisoner or detainee or the use of substandard or inadequate penal facilities under subhuman conditions shall be dealt with by law.
Section 20. No person shall be imprisoned for debt or non-payment of a poll tax.
Section 21. No person shall be twice put in jeopardy of punishment for the same offense. If an act is punished by a law and an ordinance, conviction or acquittal under either shall constitute a bar to another prosecution for the same act.
Section 22. No ex post facto law or bill of attainder shall be enacted.

ARTICLE IV — CITIZENSHIP
Section 1. The following are citizens of the Philippines:
(1) Those who are citizens of the Philippines at the time of the adoption of this Constitution;
(2) Those whose fathers or mothers are citizens of the Philippines;
(3) Those born before January 17, 1973, of Filipino mothers, who elect Philippine citizenship upon reaching the age of majority; and
(4) Those who are naturalized in accordance with law.
Section 2. Natural-born citizens are those who are citizens of the Philippines from birth without having to perform any act to acquire or perfect their Philippine citizenship. Those who elect Philippine citizenship in accordance with paragraph (3), Section 1 hereof shall be deemed natural-born citizens.
Section 3. Philippine citizenship may be lost or reacquired in the manner provided by law.
Section 4. Citizens of the Philippines who marry aliens shall retain their citizenship, unless by their act or omission, they are deemed, under the law, to have renounced it.
Section 5. Dual allegiance of citizens is inimical to the national interest and shall be dealt with by law.

ARTICLE V — SUFFRAGE
Section 1. Suffrage may be exercised by all citizens of the Philippines not otherwise disqualified by law, who are at least eighteen years of age, and who shall have resided in the Philippines for at least one year and in the place wherein they propose to vote for at least six months immediately preceding the election. No literacy, property, or other substantive requirement shall be imposed on the exercise of suffrage.
Section 2. The Congress shall provide a system for securing the secrecy and sanctity of the ballot as well as a system for absentee voting by qualified Filipinos abroad.
The Congress shall also design a procedure for the disabled and the illiterates to vote without the assistance of other persons. Until then, they shall be allowed to vote under existing laws and such rules as the Commission on Elections may promulgate to protect the secrecy of the ballot.

ARTICLE VI — LEGISLATIVE DEPARTMENT
Section 1. The legislative power shall be vested in the Congress of the Philippines which shall consist of a Senate and a House of Representatives, except to the extent reserved to the people by the provision on initiative and referendum.
Section 2. The Senate shall be composed of twenty-four Senators who shall be elected at large by the qualified voters of the Philippines, as may be provided by law.
Section 3. No person shall be a Senator unless he is a natural-born citizen of the Philippines, and, on the day of the election, is at least thirty-five years of age, able to read and write, a registered voter, and a resident of the Philippines for not less than two years immediately preceding the day of the election.
Section 4. The term of office of the Senators shall be six years and shall commence, unless otherwise provided by law, at noon on the thirtieth day of June next following their election. No Senator shall serve for more than two consecutive terms. Voluntary renunciation of the office for any length of time shall not be considered as an interruption in the continuity of his service for the full term for which he was elected.
Section 5. (1) The House of Representatives shall be composed of not more than two hundred and fifty members, unless otherwise fixed by law, who shall be elected from legislative districts apportioned among the provinces, cities, and the Metropolitan Manila area in accordance with the number of their respective inhabitants, and on the basis of a uniform and progressive ratio, and those who, as provided by law, shall be elected through a party-list system of registered national, regional, and sectoral parties or organizations.
(2) The party-list representatives shall constitute twenty per centum of the total number of representatives including those under the party list. For three consecutive terms after the ratification of this Constitution, one-half of the seats allocated to party-list representatives shall be filled, as provided by law, by selection or election from the labor, peasant, urban poor, indigenous cultural communities, women, youth, and such other sectors as may be provided by law, except the religious sector.
(3) Each legislative district shall comprise, as far as practicable, contiguous, compact, and adjacent territory. Each city with a population of at least two hundred fifty thousand, or each province, shall have at least one representative.
(4) Within three years following the return of every census, the Congress shall make a reapportionment of legislative districts based on the standards provided in this section.
Section 6. No person shall be a Member of the House of Representatives unless he is a natural-born citizen of the Philippines, and, on the day of the election, is at least twenty-five years of age, able to read and write, and, except the party-list representatives, a registered voter in the district in which he shall be elected, and a resident thereof for a period of not less than one year immediately preceding the day of the election.
Section 7. The Members of the House of Representatives shall be elected for a term of three years which shall begin, unless otherwise provided by law, at noon on the thirtieth day of June next following their election. No Member of the House of Representatives shall serve for more than three consecutive terms. Voluntary renunciation of the office for any length of time shall not be considered as an interruption in the continuity of his service for the full term for which he was elected.
Section 12. All Members of the Senate and the House of Representatives shall, upon assumption of office, make a full disclosure of their financial and business interests. They shall notify the House concerned of a potential conflict of interest in the filing of a proposed legislation of which they are authors.
Section 24. All appropriation, revenue or tariff bills, bills authorizing increase of the public debt, bills of local application, and private bills, shall originate exclusively in the House of Representatives, but the Senate may propose or concur with amendments.
Section 25. (1) The Congress may not increase the appropriations recommended by the President for the operation of the Government as specified in the budget. The form, content, and manner of preparation of the budget shall be prescribed by law.
(2) No provision or enactment shall be embraced in the general appropriations bill unless it relates specifically to some particular appropriation therein. Any such provision or enactment shall be limited in its operation to the appropriation to which it relates.
(3) The procedure in approving appropriations for the Congress shall strictly follow the procedure for approving appropriations for other departments and agencies.
(4) A special appropriations bill must specify the purpose for which it is intended, and shall be supported by funds actually available as certified by the National Treasurer, or to be raised by a revenue measure proposed therein.
(5) No law shall be passed authorizing any transfer of appropriations; however, the President, the President of the Senate, the Speaker of the House of Representatives, the Chief Justice of the Supreme Court, and the heads of Constitutional Commissions may, by law, be authorized to augment any item in the general appropriations law for their respective offices from savings in other items of their respective appropriations.
(6) Discretionary funds appropriated for particular officials shall be disbursed only for public purposes to be supported by appropriate vouchers and subject to such guidelines as may be prescribed by law.
(7) If, by the end of any fiscal year, the Congress shall have failed to pass the general appropriations bill for the ensuing fiscal year, the general appropriations law for the preceding fiscal year shall be deemed re-enacted and shall remain in force and effect until the general appropriations bill is passed by the Congress.
Section 26. (1) Every bill passed by the Congress shall embrace only one subject which shall be expressed in the title thereof.
(2) No bill passed by either House shall become a law unless it has passed three readings on separate days, and printed copies thereof in its final form have been distributed to its Members three days before its passage, except when the President certifies to the necessity of its immediate enactment to meet a public calamity or emergency. Upon the last reading of a bill, no amendment thereto shall be allowed, and the vote thereon shall be taken immediately thereafter, and the yeas and nays entered in the Journal.
Section 27. (1) Every bill passed by the Congress shall, before it becomes a law, be presented to the President. If he approves the same, he shall sign it; otherwise, he shall veto it and return the same with his objections to the House where it originated, which shall enter the objections at large in its Journal and proceed to reconsider it. If after such reconsideration, two-thirds of all the Members of such House shall agree to pass the bill, it shall be sent, together with the objections, to the other House, by which it shall likewise be reconsidered, and if approved by two-thirds of all the Members of that House, it shall become a law. In all such cases, the votes of each House shall be determined by yeas or nays, and the names of the Members voting for or against shall be entered in its Journal. The President shall communicate his veto of any bill to the House where it originated within thirty days after the date of receipt thereof; otherwise, it shall become a law as if he had signed it.
(2) The President shall have the power to veto any particular item or items in an appropriation, revenue, or tariff bill, but the veto shall not affect the item or items to which he does not object (Line-item veto).

ARTICLE VII — EXECUTIVE DEPARTMENT
Section 1. The executive power shall be vested in the President of the Philippines.
Section 2. No person may be elected President unless he is a natural-born citizen of the Philippines, a registered voter, able to read and write, at least forty years of age on the day of the election, and a resident of the Philippines for at least ten years immediately preceding such election.
Section 4. The President and the Vice-President shall be elected by direct vote of the people for a term of six years which shall begin at noon on the thirtieth day of June next following the day of the election and shall end at noon of the same date six years thereafter. The President shall not be eligible for any re-election. No person who has succeeded as President and has served as such for more than four years shall be qualified for election to the same office at any time. No Vice-President shall serve for more than two consecutive terms.
Section 13. The President, Vice-President, the Members of the Cabinet, and their deputies or assistants shall not, unless otherwise provided in this Constitution, hold any other office or employment during their tenure. They shall not, during said tenure, directly or indirectly, practice any other profession, participate in any business, or be financially interested in any contract with, or in any franchise, or special privilege granted by the Government or any subdivision, agency, or instrumentality thereof, including government-owned or controlled corporations or their subsidiaries. They shall strictly avoid conflict of interest in the conduct of their office.
The spouse and relatives by consanguinity or affinity within the fourth civil degree of the President shall not, during his tenure, be appointed as Members of the Constitutional Commissions, or the Office of the Ombudsman, or as Secretaries or Undersecretaries, or as heads of bureaus or offices, including government-owned or controlled corporations and their subsidiaries.
Section 16. The President shall nominate and, with the consent of the Commission on Appointments, appoint the heads of the executive departments, ambassadors, other public ministers and consuls, or officers of the armed forces from the rank of colonel or naval captain, and other officers whose appointments are vested in him in this Constitution. He shall also appoint all other officers of the Government whose appointments are not otherwise provided for by law, and those whom he may be authorized by law to appoint. The Congress may, by law, vest the appointment of other officers lower in rank in the President alone, in the courts, or in the heads of departments, agencies, commissions, or boards.
The President shall have the power to make appointments during the recess of the Congress, whether voluntary or compulsory, but such appointments shall be effective only until disapproval by the Commission on Appointments or until the next adjournment of the Congress.
Section 17. The President shall have control of all the executive departments, bureaus, and offices. He shall ensure that the laws be faithfully executed.
Section 18. The President shall be the Commander-in-Chief of all armed forces of the Philippines and whenever it becomes necessary, he may call out such armed forces to prevent or suppress lawless violence, invasion or rebellion. In case of invasion or rebellion, when the public safety requires it, he may, for a period not exceeding sixty days, suspend the privilege of the writ of habeas corpus or place the Philippines or any part thereof under martial law. Within forty-eight hours from the proclamation of martial law or the suspension of the privilege of the writ of habeas corpus, the President shall submit a report in person or in writing to the Congress. The Congress, voting jointly, by a vote of at least a majority of all its Members in regular or special session, may revoke such proclamation or suspension, which revocation shall not be set aside by the President. Upon initiative of the President, the Congress may, in the same manner, extend such proclamation or suspension for a period to be determined by the Congress, if the invasion or rebellion shall persist and public safety requires it.
The Congress, if not in session, shall, within twenty-four hours following such proclamation or suspension, convene in accordance with its rules without any need of a call.
The Supreme Court may review, in an appropriate proceeding filed by any citizen, the sufficiency of the factual basis of the proclamation of martial law or the suspension of the privilege of the writ of habeas corpus or the extension thereof, and must promulgate its decision thereon within thirty days from its filing.
A state of martial law shall not suspend the operation of the Constitution, nor supplant the functioning of the civil courts or legislative assemblies, nor authorize the conferment of jurisdiction on military courts and agencies over civilians where civil courts are able to function, nor automatically suspend the privilege of the writ.
Section 19. Except in cases of impeachment, or as otherwise provided in this Constitution, the President may grant reprieves, commutations, and pardons, and remit fines and forfeitures, after conviction by final judgment. He shall also have the power to grant amnesty with the concurrence of a majority of all the Members of the Congress.
Section 20. The President may contract or guarantee foreign loans on behalf of the Republic of the Philippines with the prior concurrence of the Monetary Board, and subject to such limitations as may be provided by law.
Section 21. No treaty or international agreement shall be valid and effective unless concurred in by at least two-thirds of all the Members of the Senate.

ARTICLE VIII — JUDICIAL DEPARTMENT
Section 1. The judicial power shall be vested in one Supreme Court and in such lower courts as may be established by law.
Judicial power includes the duty of the courts of justice to settle actual controversies involving rights which are legally demandable and enforceable, and to determine whether or not there has been a grave abuse of discretion amounting to lack or excess of jurisdiction on the part of any branch or instrumentality of the Government.
Section 2. The Congress shall have the power to define, prescribe, and apportion the jurisdiction of the various courts but may not deprive the Supreme Court of its jurisdiction over cases enumerated in Section 5 hereof. No law shall be passed reorganizing the Judiciary when it undermines the security of tenure of its Members.
Section 3. The Judiciary shall enjoy fiscal autonomy. Appropriations for the Judiciary may not be reduced by the legislature below the amount appropriated for the previous year and, after approval, shall be automatically and regularly released.
Section 4. (1) The Supreme Court shall be composed of a Chief Justice and fourteen Associate Justices. It may sit en banc or in its discretion, in division of three, five, or seven Members. Any vacancy shall be filled within ninety days from the occurrence thereof.
(2) All cases involving the constitutionality of a treaty, international or executive agreement, or law, which shall be heard by the Supreme Court en banc, and all other cases which under the Rules of Court are required to be heard en banc, including those involving the constitutionality, application, or operation of presidential decrees, proclamations, orders, instructions, ordinances, and other regulations, shall be decided with the concurrence of a majority of the Members who actually took part in the deliberations on the issues in the case and voted thereon.
(3) Cases or matters heard by a division shall be decided or resolved with the concurrence of a majority of the Members who actually took part in the deliberations on the issues in the case and voted thereon, and in no case without the concurrence of at least three of such Members. When the required number is not obtained, the case shall be decided en banc: Provided, that no doctrine or principle of law laid down by the court in a decision rendered en banc or in division may be modified or reversed except by the court sitting en banc.
Section 5. The Supreme Court shall have the following powers:
(1) Exercise original jurisdiction over cases affecting ambassadors, other public ministers and consuls, and over petitions for certiorari, prohibition, mandamus, quo warranto, and habeas corpus.
(2) Review, revise, reverse, modify, or affirm on appeal or certiorari, as the law or the Rules of Court may provide, final judgments and orders of lower courts in:
(a) All cases in which the constitutionality or validity of any treaty, international or executive agreement, law, presidential decree, proclamation, order, instruction, ordinance, or regulation is in question.
(b) All cases involving the legality of any tax, impost, assessment, or toll, or any penalty imposed in relation thereto.
(c) All cases in which the jurisdiction of any lower court is in issue.
(d) All criminal cases in which the penalty imposed is reclusion perpetua or higher.
(e) All cases in which only an error or question of law is involved.
(3) Assign temporarily judges of lower courts to other stations as public interest may require. Such temporary assignment shall not exceed six months without the consent of the judge concerned.
(4) Order a change of venue or place of trial to avoid a miscarriage of justice.
(5) Promulgate rules concerning the protection and enforcement of constitutional rights, pleading, practice, and procedure in all courts, the admission to the practice of law, the Integrated Bar, and legal assistance to the underprivileged. Such rules shall provide a simplified and inexpensive procedure for the speedy disposition of cases, shall be uniform for all courts of the same grade, and shall not diminish, increase, or modify substantive rights. Rules of procedure of special courts and quasi-judicial bodies shall remain effective unless disapproved by the Supreme Court.
(6) Appoint all officials and employees of the Judiciary in accordance with the Civil Service Law.
Section 7. (1) No person shall be appointed Member of the Supreme Court or any lower collegiate court unless he is a natural-born citizen of the Philippines. A Member of the Supreme Court must be at least forty years of age, and must have been for fifteen years or more a judge of a lower court or engaged in the practice of law in the Philippines.
(2) The Congress shall prescribe the qualifications of judges of lower courts, but no person may be appointed judge thereof unless he is a citizen of the Philippines and a member of the Philippine Bar.
(3) A Member of the Judiciary must be a person of proven competence, integrity, probity, and independence.
Section 8. (1) A Judicial and Bar Council is hereby created under the supervision of the Supreme Court composed of the Chief Justice as ex officio Chairman, the Secretary of Justice, and a representative of the Congress as ex officio Members, a representative of the Integrated Bar, a professor of law, a retired Member of the Supreme Court, and a representative of the private sector.
(2) The regular members of the Council shall be appointed by the President for a term of four years with the consent of the Commission on Appointments. Of the regular members first appointed, the representative of the Integrated Bar shall hold office for four years, the professor of law for three years, the retired Justice for two years, and the representative of the private sector for one year.
(3) The Clerk of the Supreme Court shall be a Secretary ex officio of the Council and shall keep a record of its proceedings.
(4) The regular Members of the Council shall receive such emoluments as may be determined by the Supreme Court. The Supreme Court shall provide in its annual budget the appropriations for the Council.
(5) The Council shall have the principal function of recommending appointees to the Judiciary. It may exercise such other functions and duties as the Supreme Court may assign to it.
Section 11. The Members of the Supreme Court and judges of lower courts shall hold office during good behavior until they reach the age of seventy years or become incapacitated to discharge the duties of their office. The Supreme Court en banc shall have the power to discipline judges of lower courts, or order their dismissal by a vote of a majority of the Members who actually took part in the deliberations on the issues in the case and voted thereon.

ARTICLE IX — CONSTITUTIONAL COMMISSIONS
A. COMMON PROVISIONS: Section 1. The Constitutional Commissions, which shall be independent, are the Civil Service Commission, the Commission on Elections, and the Commission on Audit.
Section 2. No Member of a Constitutional Commission shall, during his tenure, hold any other office or employment. Neither shall he engage in the practice of any profession or in the active management or control of any business which in any way may be affected by the functions of his office, nor shall he be financially interested, directly or indirectly, in any contract with, or in any franchise or privilege granted by the Government, any of its subdivisions, agencies, or instrumentalities, including government-owned or controlled corporations or their subsidiaries.
B. CIVIL SERVICE COMMISSION: Section 1. (1) The Civil Service shall be administered by the Civil Service Commission composed of a Chairman and two Commissioners who shall be natural-born citizens of the Philippines and, at the time of their appointment, at least thirty-five years of age, with proven capacity for public administration, and must not have been candidates for any elective position in the elections immediately preceding their appointment.
(2) The Chairman and the Commissioners shall be appointed by the President with the consent of the Commission on Appointments for a term of seven years without reappointment. Of the Commissioners first appointed, one shall hold office for seven years, another for five years, and the third for three years, without reappointment.
Section 2. (1) The civil service embraces all branches, subdivisions, instrumentalities, and agencies of the Government, including government-owned or controlled corporations with original charters.
(2) Appointments in the civil service shall be made only according to merit and fitness to be determined, as far as practicable, and, except to positions which are policy-determining, primarily confidential, or highly technical, by competitive examination.
(3) No officer or employee of the civil service shall be removed or suspended except for cause provided by law.
(4) No officer or employee in the civil service shall engage, directly or indirectly, in any electioneering or partisan political campaign.
(5) The right of the people to self-organization shall not be denied to government employees.
(6) Temporary employees of the Government shall be given such protection as may be provided by law.
C. COMMISSION ON ELECTIONS: Section 1. (1) There shall be a Commission on Elections composed of a Chairman and six Commissioners, who shall be natural-born citizens of the Philippines and, at the time of their appointment, at least thirty-five years of age, holders of a college degree, and must not have been candidates for any elective position in the immediately preceding elections. However, a majority thereof, including the Chairman, shall be members of the Philippine Bar who have been engaged in the practice of law for at least ten years.
(2) The Chairman and the Commissioners shall be appointed by the President with the consent of the Commission on Appointments for a term of seven years without reappointment. Of those first appointed, three shall hold office for seven years, two for five years, and the remaining two for three years, without reappointment.
Section 2. The Commission on Elections shall exercise the following powers and functions:
(1) Enforce and administer all laws and regulations relative to the conduct of an election, plebiscite, initiative, referendum, and recall.
(2) Exercise exclusive original jurisdiction over all contests relating to the elections, returns, and qualifications of all regional, provincial, and city officials, and appellate jurisdiction over all contests involving municipal and barangay officials decided by trial courts of general or limited jurisdiction.
D. COMMISSION ON AUDIT: Section 1. (1) There shall be a Commission on Audit composed of a Chairman and two Commissioners, who shall be natural-born citizens of the Philippines and, at the time of their appointment, at least thirty-five years of age, certified public accountants with not less than ten years of auditing experience, or members of the Philippine Bar who have been engaged in the practice of law for at least ten years, and must not have been candidates for any elective position in the elections immediately preceding their appointment. At no time shall all Members of the Commission belong to the same profession.
(2) The Chairman and the Commissioners shall be appointed by the President with the consent of the Commission on Appointments for a term of seven years without reappointment. Of the Commissioners first appointed, one shall hold office for seven years, another for five years, and the third for three years, without reappointment.
Section 2. (1) The Commission on Audit shall have the power, authority, and duty to examine, audit, and settle all accounts pertaining to the revenue and receipts of, and expenditures or uses of funds and property, owned or held in trust by, or pertaining to, the Government, or any of its subdivisions, agencies, or instrumentalities, including government-owned or controlled corporations with original charters, and on a post-audit basis: (a) constitutional bodies, commissions or offices that have been granted fiscal autonomy under this Constitution; (b) autonomous state colleges and universities; (c) other government-owned or controlled corporations and their subsidiaries; and (d) such non-governmental entities receiving subsidy or equity, directly or indirectly, from or through the Government, which are required by law or the granting institution to submit to such audit.

ARTICLE X — LOCAL GOVERNMENT
GENERAL PROVISIONS: Section 1. The territorial and political subdivisions of the Republic of the Philippines are the provinces, cities, municipalities, and barangays. There shall be autonomous regions in Muslim Mindanao and the Cordilleras as hereinafter provided.
Section 2. The territorial and political subdivisions shall enjoy local autonomy.
AUTONOMOUS REGIONS: Section 15. There shall be created autonomous regions in Muslim Mindanao and in the Cordilleras consisting of provinces, cities, municipalities, and geographical areas sharing common and distinctive historical and cultural heritage, economic and social structures, and other relevant characteristics within the framework of this Constitution and the national sovereignty as well as territorial integrity of the Republic of the Philippines.

ARTICLE XI — ACCOUNTABILITY OF PUBLIC OFFICERS
Section 1. Public office is a public trust. Public officers and employees must at all times be accountable to the people, serve them with utmost responsibility, integrity, loyalty, and efficiency, act with patriotism and justice, and lead modest lives.
Section 2. The President, the Vice-President, the Members of the Supreme Court, the Members of the Constitutional Commissions, and the Ombudsman may be removed from office, on impeachment for, and conviction of, culpable violation of the Constitution, treason, bribery, graft and corruption, other high crimes, or betrayal of public trust. All other public officers and employees may be removed from office as provided by law, but not by impeachment.
Section 3. (1) The House of Representatives shall have the exclusive power to initiate all cases of impeachment.
(2) A verified complaint for impeachment may be filed by any Member of the House of Representatives or by any citizen upon a resolution of endorsement by any Member thereof, which shall be included in the Order of Business within ten session days.
(6) The Senate shall have the sole power to try and decide all cases of impeachment. When sitting for that purpose, the Senators shall be on oath or affirmation. When the President of the Philippines is on trial, the Chief Justice of the Supreme Court shall preside, but shall not vote. No person shall be convicted without the concurrence of two-thirds of all the Members of the Senate.
(7) Judgment in cases of impeachment shall not extend further than removal from office and disqualification to hold any office under the Republic of the Philippines, but the party convicted shall nevertheless be liable and subject to prosecution, trial, and punishment according to law.
(8) The Congress shall promulgate its rules on impeachment to effectively carry out the purpose of this section.
Section 5. There is hereby created the independent Office of the Ombudsman, composed of the Ombudsman to be known as Tanodbayan, one overall Deputy, and at least one Deputy each for Luzon, Visayas, and Mindanao. A separate Deputy for the military establishment may likewise be appointed.
Section 12. The Ombudsman and his Deputies, as protectors of the people, shall act promptly on complaints filed in any form or manner against public officials or employees of the Government, including government-owned or controlled corporations, and shall, in appropriate cases, notify the complainants of the action taken and the results thereof.

ARTICLE XII — NATIONAL ECONOMY AND PATRIMONY
Section 1. The goals of the national economy are a more equitable distribution of opportunities, income, and wealth; a sustained increase in the amount of goods and services produced by the nation for the benefit of the people; and an expanding productivity as the key to raising the quality of life for all, especially the underprivileged.
The State shall promote industrialization and full employment based on agricultural development and agrarian reform, through industries that make full and efficient use of human and natural resources, and which are competitive in both domestic and foreign markets. However, the State shall protect Filipino enterprises against unfair foreign competition and trade practices.
Section 2. All lands of the public domain, waters, minerals, coal, petroleum, and other mineral oils, all forces of potential energy, fisheries, forests or timber, wildlife, flora and fauna, and other natural resources are owned by the State. With the exception of agricultural lands, all other natural resources shall not be alienated. The exploration, development, and utilization of natural resources shall be under the full control and supervision of the State (The Regalian Doctrine). The State may directly undertake such activities, or it may enter into co-production, joint venture, or production-sharing agreements with Filipino citizens, or corporations or associations at least sixty per centum of whose capital is owned by such citizens. Such agreements may be for a period not exceeding twenty-five years, renewable for not more than twenty-five years, and under such terms and conditions as may be provided by law. In cases of water rights for irrigation, water supply, fisheries, or industrial uses other than the development of water power, beneficial use may be the measure and limit of the grant.
Section 3. Lands of the public domain are classified into agricultural, forest or timber, mineral lands, and national parks. Agricultural lands of the public domain may be further classified by law according to the uses to which they may be devoted. Alienable lands of the public domain shall be limited to agricultural lands. Private corporations or associations may not hold such alienable lands of the public domain except by lease, for a period not exceeding twenty-five years, renewable for not more than twenty-five years, and not to exceed one thousand hectares in area.
Section 7. Save in cases of hereditary succession, no private lands shall be transferred or conveyed except to individuals, corporations, or associations qualified to acquire or hold lands of the public domain.
Section 11. No franchise, certificate, or any other form of authorization for the operation of a public utility shall be granted except to citizens of the Philippines or to corporations or associations organized under the laws of the Philippines at least sixty per centum of whose capital is owned by such citizens, nor shall such franchise, certificate, or authorization be exclusive in character or for a longer period than fifty years. Neither shall any such franchise or right be granted except under the condition that it shall be subject to amendment, alteration, or repeal by the Congress when the common good so requires.

ARTICLE XIII — SOCIAL JUSTICE AND HUMAN RIGHTS
Section 1. The Congress shall give highest priority to the enactment of measures that protect and enhance the right of all the people to human dignity, reduce social, economic, and political inequalities, and remove cultural inequities by equitably diffusing wealth and political power for the common good.
To this end, the State shall regulate the acquisition, ownership, use, and disposition of property and its increments.
LABOR: Section 3. The State shall afford full protection to labor, local and overseas, organized and unorganized, and promote full employment and equality of employment opportunities for all.
It shall guarantee the rights of all workers to self-organization, collective bargaining and negotiations, and peaceful concerted activities, including the right to strike in accordance with law. They shall be entitled to security of tenure, humane conditions of work, and a living wage. They shall also participate in policy and decision-making processes affecting their rights and benefits as may be provided by law.
AGRARIAN AND NATURAL RESOURCES REFORM: Section 4. The State shall, by law, undertake an agrarian reform program founded on the right of farmers and regular farmworkers, who are landless, to own directly or collectively the lands they till or, in the case of other farmworkers, to receive a just share of the fruits thereof. To this end, the State shall encourage and undertake the just distribution of all agricultural lands, subject to such priorities and reasonable limits as the Congress may prescribe, taking into account ecological, developmental, or equity considerations, and subject to the payment of just compensation.
HUMAN RIGHTS: Section 17. (1) There is hereby created an independent office called the Commission on Human Rights.
Section 18. The Commission on Human Rights shall have the following powers and functions:
(1) Investigate, on its own or on complaint by any party, all forms of human rights violations involving civil and political rights.
(2) Provide appropriate legal measures for the protection of human rights of all persons within the Philippines, as well as Filipinos residing abroad, and provide for preventive measures and legal aid services to the underprivileged.

ARTICLE XIV — EDUCATION, SCIENCE AND TECHNOLOGY, ARTS, CULTURE AND SPORTS
EDUCATION: Section 1. The State shall protect and promote the right of all citizens to quality education at all levels and shall take appropriate steps to make such education accessible to all.
Section 2. The State shall:
(1) Establish, maintain, and support a complete, adequate, and integrated system of education relevant to the needs of the people and society;
(2) Establish and maintain a system of free public education in the elementary and high school levels. Without limiting the natural right of parents to rear their children, elementary education is compulsory for all children of school age.
(3) Establish and maintain a system of scholarship grants, student loan programs, subsidies, and other incentives which shall be available to deserving students in both public and private schools, especially to the underprivileged.
LANGUAGE: Section 6. The national language of the Philippines is Filipino. As it evolves, it shall be further developed and enriched on the basis of existing Philippine and other languages.
Subject to provisions of law and as the Congress may deem appropriate, the Government shall take steps to initiate and sustain the use of Filipino as a medium of official communication and as language of instruction in the educational system.
Section 7. For purposes of communication and instruction, the official languages of the Philippines are Filipino and, until otherwise provided by law, English.

ARTICLE XV — THE FAMILY
Section 1. The State recognizes the Filipino family as the foundation of the nation. Accordingly, it shall strengthen its solidarity and actively promote its total development.
Section 2. Marriage, as an inviolable social institution, is the foundation of the family and shall be protected by the State.
Section 3. The State shall defend:
(1) The right of spouses to found a family in accordance with their religious convictions and the demands of responsible parenthood;
(2) The right of children to assistance, including proper care and nutrition, and special protection from all forms of neglect, abuse, cruelty, exploitation, and other conditions prejudicial to their development;
(3) The right of the family to a family living wage and income; and
(4) The right of families or family associations to participate in the planning and implementation of policies and programs that affect them.

ARTICLE XVI — GENERAL PROVISIONS
Section 1. flag of the Philippines shall be red, white, and blue, with a sun and three stars, as consecrated and honored by the people and recognized by law.
Section 2. The Congress may, by law, adopt a new name for the country, a new national anthem, or a new national seal, which shall all be truly reflective and symbolic of the ideals, history, and traditions of the people. Such law shall take effect only upon its ratification by the people in a national referendum.
Section 3. The State may not be sued without its consent (Sovereign Immunity).

ARTICLE XVII — AMENDMENTS OR REVISIONS
Section 1. Any amendment to, or revision of, this Constitution may be proposed by:
(1) The Congress, upon a vote of three-fourths of all its Members; or
(2) A constitutional convention.
Section 2. Amendments to this Constitution may also be directly proposed by the people through initiative upon petition of at least twelve per centum of the total number of registered voters, of which every legislative district must be represented by at least three per centum of the registered voters therein. No amendment under this section shall be authorized within five years following the ratification of this Constitution nor oftener than once every five years thereafter...

ARTICLE XVIII — TRANSITORY PROVISIONS
Section 25. After the expiration in 1991 of the Agreement between the Republic of the Philippines and the United States of America concerning Military Bases, foreign military bases, troops, or facilities shall not be allowed in the Philippines except under a treaty duly concurred in by the Senate and, when the Congress so requires, ratified by a majority of the votes cast by the people in a national referendum held for that purpose, and recognized as a treaty by the other contracting State.
Section 27. This Constitution shall take effect immediately upon its ratification by a majority of the votes cast in a plebiscite held for the purpose and shall supersede all previous Constitutions.`,
  highlights: [],
  sections: [
    {
      id: 'consti-preamble',
      title: 'Preamble',
      text: 'We, the sovereign Filipino people, imploring the aid of Almighty God, in order to build a just and humane society, and establish a Government that shall embody our ideals and aspirations, promote the common good, conserve and develop our patrimony, and secure to ourselves and our posterity, the blessings of independence and democracy under the rule of law and a regime of truth, justice, freedom, love, equality, and peace, do ordain and promulgate this Constitution.'
    },
    {
      id: 'consti-art-1',
      title: 'Article I: National Territory',
      text: 'The national territory comprises the Philippine archipelago, with all the islands and waters embraced therein, and all other territories over which the Philippines has sovereignty or jurisdiction, consisting of its terrestrial, fluvial and aerial domains, including its territorial sea, the seabed, the subsoil, the insular shelves, and other submarine areas. The waters around, between, and connecting the islands of the archipelago, regardless of their breadth and dimensions, form part of the internal waters of the Philippines.'
    },
    {
      id: 'consti-art-2-principles',
      title: 'Article II: State Principles (Sec. 1 - 6)',
      text: `Section 1. The Philippines is a democratic and republican State. Sovereignty resides in the people and all government authority emanates from them.
      
Section 2. The Philippines renounces war as an instrument of national policy, adopts the generally accepted principles of international law as part of the law of the land and adheres to the policy of peace, equality, justice, freedom, cooperation, and amity with all nations.

Section 3. Civilian authority is, at all times, supreme over the military. The Armed Forces of the Philippines is the protector of the people and the State. Its goal is to secure the sovereignty of the State and the integrity of the national territory.

Section 4. The prime duty of the Government is to serve and protect the people. The Government may call upon the people to defend the State and, in the fulfillment thereof, all citizens may be required, under conditions provided by law, to render personal, military or civil service.

Section 5. The maintenance of peace and order, the protection of life, liberty, and property, and promotion of the general welfare are essential for the enjoyment by all the people of the blessings of democracy.

Section 6. The separation of Church and State shall be inviolable.`
    },
    {
      id: 'consti-art-2-policies',
      title: 'Article II: State Policies (Sec. 7 - 28)',
      text: `Section 7. The State shall pursue an independent foreign policy. In its relations with other states, the paramount consideration shall be national sovereignty, territorial integrity, national interest, and the right to self-determination.

Section 8. The Philippines, consistent with the national interest, adopts and pursues a policy of freedom from nuclear weapons in its territory.

Section 9. The State shall promote a just and dynamic social order that will ensure the prosperity and independence of the nation and free the people from poverty through policies that provide adequate social services, promote full employment, a rising standard of living, and an improved quality of life for all.

Section 10. The State shall promote social justice in all phases of national development.

Section 11. The State values the dignity of every human person and guarantees full respect for human rights.

Section 12. The State recognizes the sanctity of family life and shall protect and strengthen the family as a basic autonomous social institution. It shall equally protect the life of the mother and the life of the unborn from conception. The natural and primary right and duty of parents in the rearing of the youth for civic efficiency and the development of moral character shall receive the support of the Government.

Section 13. The State recognizes the vital role of the youth in nation-building and shall promote and protect their physical, moral, spiritual, intellectual, and social well-being. It shall inculcate in the youth patriotism and nationalism, and encourage their involvement in public and civic affairs.

Section 14. The State recognizes the role of women in nation-building, and shall ensure the fundamental equality before the law of women and men.

Section 15. The State shall protect and promote the right to health of the people and instill health consciousness among them.

Section 16. The State shall protect and advance the right of the people to a balanced and healthful ecology in accord with the rhythm and harmony of nature.

Section 17. The State shall give priority to education, science and technology, arts, culture, and sports to foster patriotism and nationalism, accelerate social progress, and promote total human liberation and development.

Section 18. The State affirms labor as a primary social economic force. It shall protect the rights of workers and promote their welfare.

Section 19. The State shall develop a self-reliant and independent national economy effectively controlled by Filipinos.

Section 20. The State recognizes the indispensable role of the private sector, encourages private enterprise, and provides incentives to needed investments.

Section 21. The State shall promote comprehensive rural development and agrarian reform.

Section 22. The State recognizes and promotes the rights of indigenous cultural communities within the framework of national unity and development.

Section 23. The State shall encourage non-governmental, community-based, or sectoral organizations that promote the welfare of the nation.

Section 24. The State recognizes the vital role of communication and information in nation-building.

Section 25. The State shall ensure the autonomy of local governments.

Section 26. The State shall guarantee equal access to opportunities for public service, and prohibit political dynasties as may be defined by law.

Section 27. The State shall maintain honesty and integrity in the public service and take positive and effective measures against graft and corruption.

Section 28. Subject to reasonable conditions prescribed by law, the State adopts and implements a policy of full public disclosure of all its transactions involving public interest.`
    },
    {
      id: 'consti-art-3-sec-1-10',
      title: 'Article III: Bill of Rights (Sec. 1 - 10)',
      text: `Section 1. No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws.

Section 2. The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable, and no search warrant or warrant of arrest shall issue except upon probable cause to be determined personally by the judge after examination under oath or affirmation of the complainant and the witnesses he may produce, and particularly describing the place to be searched and the persons or things to be seized.

Section 3. (1) The privacy of communication and correspondence shall be inviolable except upon lawful order of the court, or when public safety or order requires otherwise, as prescribed by law.
(2) Any evidence obtained in violation of this or the preceding section shall be inadmissible for any purpose in any proceeding.

Section 4. No law shall be passed abridging the freedom of speech, of expression, or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances.

Section 5. No law shall be made respecting an establishment of religion, or prohibiting the free exercise thereof. The free exercise and enjoyment of religious profession and worship, without discrimination or preference, shall forever be allowed. No religious test shall be required for the exercise of civil or political rights.

Section 6. The liberty of abode and of changing the same within the limits prescribed by law shall not be impaired except upon lawful order of the court. Neither shall the right to travel be impaired except in the interest of national security, public safety, or public health, as may be provided by law.

Section 7. The right of the people to information on matters of public concern shall be recognized. Access to official records, and to documents and papers pertaining to official acts, transactions, or decisions, as well as to government research data used as basis for policy development, shall be afforded the citizen, subject to such limitations as may be provided by law.

Section 8. The right of the people, including those employed in the public and private sectors, to form unions, associations, or societies for purposes not contrary to law shall not be abridged.

Section 9. Private property shall not be taken for public use without just compensation.

Section 10. No law impairing the obligation of contracts shall be passed.`
    },
    {
      id: 'consti-art-3-sec-11-22',
      title: 'Article III: Bill of Rights (Sec. 11 - 22)',
      text: `Section 11. Free access to the courts and quasi-judicial bodies and adequate legal assistance shall not be denied to any person by reason of poverty.

Section 12. (1) Any person under investigation for the commission of an offense shall have the right to be informed of his right to remain silent and to have competent and independent counsel preferably of his own choice. If the person cannot afford the services of counsel, he must be provided with one. These rights cannot be waived except in writing and in the presence of counsel.
(2) No torture, force, violence, threat, intimidation, or any other means which vitiate the free will shall be used against him. Secret detention places, solitary, incommunicado, or other similar forms of detention are prohibited.
(3) Any confession or admission obtained in violation of this or Section 17 hereof shall be inadmissible in evidence against him.
(4) The law shall provide for penal and civil sanctions for violations of this section as well as compensation to and rehabilitation of victims of torture or similar practices, and their families.

Section 13. All persons, except those charged with offenses punishable by reclusion perpetua when evidence of guilt is strong, shall, before conviction, be bailable by sufficient sureties, or be released on recognizance as may be provided by law. The right to bail shall not be impaired even when the privilege of the writ of habeas corpus is suspended. Excessive bail shall not be required.

Section 14. (1) No person shall be held to answer for a criminal offense without due process of law.
(2) In all criminal prosecutions, the accused shall be presumed innocent until the contrary is proved, and shall enjoy the right to be heard by himself and counsel, to be informed of the nature and cause of the accusation against him, to have a speedy, impartial, and public trial, to meet the witnesses face to face, and to have compulsory process to secure the attendance of witnesses and the production of evidence in his behalf. However, after arraignment, trial may proceed notwithstanding the absence of the accused: Provided, that he has been duly notified and his failure to appear is unjustifiable.

Section 15. The privilege of the writ of habeas corpus shall not be suspended except in cases of invasion or rebellion, when the public safety requires it.

Section 16. All persons shall have the right to a speedy disposition of their cases before all judicial, quasi-judicial, or administrative bodies.

Section 17. No person shall be compelled to be a witness against himself.

Section 18. (1) No person shall be detained solely by reason of his political beliefs and aspirations.
(2) No involuntary servitude in any form shall exist except as a punishment for a crime whereof the party shall have been duly convicted.

Section 19. (1) Excessive fines shall not be imposed, nor cruel, degrading or inhuman punishment inflicted. Neither shall the death penalty be imposed, unless, for compelling reasons involving heinous crimes, the Congress hereafter provides for it. Any death penalty already imposed shall be reduced to reclusion perpetua.
(2) The employment of physical, psychological, or degrading punishment against any prisoner or detainee or the use of substandard or inadequate penal facilities under subhuman conditions shall be dealt with by law.

Section 20. No person shall be imprisoned for debt or non-payment of a poll tax.

Section 21. No person shall be twice put in jeopardy of punishment for the same offense. If an act is punished by a law and an ordinance, conviction or acquittal under either shall constitute a bar to another prosecution for the same act.

Section 22. No ex post facto law or bill of attainder shall be enacted.`
    },
    {
      id: 'consti-art-4',
      title: 'Article IV: Citizenship',
      text: `Section 1. The following are citizens of the Philippines:
(1) Those who are citizens of the Philippines at the time of the adoption of this Constitution;
(2) Those whose fathers or mothers are citizens of the Philippines;
(3) Those born before January 17, 1973, of Filipino mothers, who elect Philippine citizenship upon reaching the age of majority; and
(4) Those who are naturalized in accordance with law.

Section 2. Natural-born citizens are those who are citizens of the Philippines from birth without having to perform any act to acquire or perfect their Philippine citizenship. Those who elect Philippine citizenship in accordance with paragraph (3), Section 1 hereof shall be deemed natural-born citizens.

Section 3. Philippine citizenship may be lost or reacquired in the manner provided by law.

Section 4. Citizens of the Philippines who marry aliens shall retain their citizenship, unless by their act or omission, they are deemed, under the law, to have renounced it.

Section 5. Dual allegiance of citizens is inimical to the national interest and shall be dealt with by law.`
    },
    {
      id: 'consti-art-5',
      title: 'Article V: Suffrage',
      text: `Section 1. Suffrage may be exercised by all citizens of the Philippines not otherwise disqualified by law, who are at least eighteen years of age, and who shall have resided in the Philippines for at least one year and in the place wherein they propose to vote for at least six months immediately preceding the election. No literacy, property, or other substantive requirement shall be imposed on the exercise of suffrage.

Section 2. The Congress shall provide a system for securing the secrecy and sanctity of the ballot as well as a system for absentee voting by qualified Filipinos abroad.
The Congress shall also design a procedure for the disabled and the illiterates to vote without the assistance of other persons. Until then, they shall be allowed to vote under existing laws and such rules as the Commission on Elections may promulgate to protect the secrecy of the ballot.`
    },
    {
      id: 'consti-art-6',
      title: 'Article VI: Legislative Department',
      text: `Section 1. The legislative power shall be vested in the Congress of the Philippines which shall consist of a Senate and a House of Representatives, except to the extent reserved to the people by the provision on initiative and referendum.

Section 2. The Senate shall be composed of twenty-four Senators who shall be elected at large by the qualified voters of the Philippines, as may be provided by law.

Section 3. No person shall be a Senator unless he is a natural-born citizen of the Philippines, and, on the day of the election, is at least thirty-five years of age, able to read and write, a registered voter, and a resident of the Philippines for not less than two years immediately preceding the day of the election.

Section 4. The term of office of the Senators shall be six years and shall commence, unless otherwise provided by law, at noon on the thirtieth day of June next following their election. No Senator shall serve for more than two consecutive terms. Voluntary renunciation of the office for any length of time shall not be considered as an interruption in the continuity of his service for the full term for which he was elected.

Section 5. (1) The House of Representatives shall be composed of not more than two hundred and fifty members, unless otherwise fixed by law, who shall be elected from legislative districts apportioned among the provinces, cities, and the Metropolitan Manila area in accordance with the number of their respective inhabitants, and on the basis of a uniform and progressive ratio, and those who, as provided by law, shall be elected through a party-list system of registered national, regional, and sectoral parties or organizations.
(2) The party-list representatives shall constitute twenty per centum of the total number of representatives including those under the party list...

Section 6. No person shall be a Member of the House of Representatives unless he is a natural-born citizen of the Philippines, and, on the day of the election, is at least twenty-five years of age, able to read and write, and, except the party-list representatives, a registered voter in the district in which he shall be elected, and a resident thereof for a period of not less than one year immediately preceding the day of the election.

Section 7. The Members of the House of Representatives shall be elected for a term of three years... No Member of the House of Representatives shall serve for more than three consecutive terms.

Section 12. All Members of the Senate and the House of Representatives shall, upon assumption of office, make a full disclosure of their financial and business interests. They shall notify the House concerned of a potential conflict of interest in the filing of a proposed legislation of which they are authors.

Section 24. All appropriation, revenue or tariff bills, bills authorizing increase of the public debt, bills of local application, and private bills, shall originate exclusively in the House of Representatives, but the Senate may propose or concur with amendments.

Section 25. (1) The Congress may not increase the appropriations recommended by the President for the operation of the Government as specified in the budget...

Section 26. (1) Every bill passed by the Congress shall embrace only one subject which shall be expressed in the title thereof.
(2) No bill passed by either House shall become a law unless it has passed three readings on separate days, and printed copies thereof in its final form have been distributed to its Members three days before its passage, except when the President certifies to the necessity of its immediate enactment to meet a public calamity or emergency...

Section 27. (1) Every bill passed by the Congress shall, before it becomes a law, be presented to the President. If he approves the same, he shall sign it; otherwise, he shall veto it and return the same with his objections to the House where it originated... If after such reconsideration, two-thirds of all the Members of such House shall agree to pass the bill, it shall be sent... to the other House... and if approved by two-thirds of all the Members of that House, it shall become a law...
The President shall have the power to veto any particular item or items in an appropriation, revenue, or tariff bill, but the veto shall not affect the item or items to which he does not object (Line-item veto).`
    },
    {
      id: 'consti-art-7',
      title: 'Article VII: Executive Department',
      text: `Section 1. The executive power shall be vested in the President of the Philippines.

Section 2. No person may be elected President unless he is a natural-born citizen of the Philippines, a registered voter, able to read and write, at least forty years of age on the day of the election, and a resident of the Philippines for at least ten years immediately preceding such election.

Section 4. The President and the Vice-President shall be elected by direct vote of the people for a term of six years which shall begin at noon on the thirtieth day of June next following the day of the election and shall end at noon of the same date six years thereafter. The President shall not be eligible for any re-election. No person who has succeeded as President and has served as such for more than four years shall be qualified for election to the same office at any time. No Vice-President shall serve for more than two consecutive terms.

Section 13. The President, Vice-President, the Members of the Cabinet, and their deputies or assistants shall not, unless otherwise provided in this Constitution, hold any other office or employment during their tenure. They shall not, during said tenure, directly or indirectly, practice any other profession, participate in any business, or be financially interested in any contract with, or in any franchise, or special privilege granted by the Government...

Section 16. The President shall nominate and, with the consent of the Commission on Appointments, appoint the heads of the executive departments, ambassadors, other public ministers and consuls, or officers of the armed forces from the rank of colonel or naval captain, and other officers whose appointments are vested in him in this Constitution...

Section 17. The President shall have control of all the executive departments, bureaus, and offices. He shall ensure that the laws be faithfully executed.

Section 18. The President shall be the Commander-in-Chief of all armed forces of the Philippines and whenever it becomes necessary, he may call out such armed forces to prevent or suppress lawless violence, invasion or rebellion. In case of invasion or rebellion, when the public safety requires it, he may, for a period not exceeding sixty days, suspend the privilege of the writ of habeas corpus or place the Philippines or any part thereof under martial law. Within forty-eight hours from the proclamation of martial law or the suspension of the privilege of the writ of habeas corpus, the President shall submit a report in person or in writing to the Congress. The Congress, voting jointly, by a vote of at least a majority of all its Members in regular or special session, may revoke such proclamation or suspension, which revocation shall not be set aside by the President...

Section 19. Except in cases of impeachment, or as otherwise provided in this Constitution, the President may grant reprieves, commutations, and pardons, and remit fines and forfeitures, after conviction by final judgment. He shall also have the power to grant amnesty with the concurrence of a majority of all the Members of the Congress.

Section 20. The President may contract or guarantee foreign loans on behalf of the Republic of the Philippines with the prior concurrence of the Monetary Board, and subject to such limitations as may be provided by law.

Section 21. No treaty or international agreement shall be valid and effective unless concurred in by at least two-thirds of all the Members of the Senate.`
    },
    {
      id: 'consti-art-8',
      title: 'Article VIII: Judicial Department',
      text: `Section 1. The judicial power shall be vested in one Supreme Court and in such lower courts as may be established by law.
Judicial power includes the duty of the courts of justice to settle actual controversies involving rights which are legally demandable and enforceable, and to determine whether or not there has been a grave abuse of discretion amounting to lack or excess of jurisdiction on the part of any branch or instrumentality of the Government.

Section 2. The Congress shall have the power to define, prescribe, and apportion the jurisdiction of the various courts but may not deprive the Supreme Court of its jurisdiction over cases enumerated in Section 5 hereof. No law shall be passed reorganizing the Judiciary when it undermines the security of tenure of its Members.

Section 3. The Judiciary shall enjoy fiscal autonomy. Appropriations for the Judiciary may not be reduced by the legislature below the amount appropriated for the previous year and, after approval, shall be automatically and regularly released.

Section 4. (1) The Supreme Court shall be composed of a Chief Justice and fourteen Associate Justices. It may sit en banc or in its discretion, in division of three, five, or seven Members...

Section 5. The Supreme Court shall have the following powers:
(1) Exercise original jurisdiction over cases affecting ambassadors, other public ministers and consuls, and over petitions for certiorari, prohibition, mandamus, quo warranto, and habeas corpus.
(2) Review, revise, reverse, modify, or affirm on appeal or certiorari, as the law or the Rules of Court may provide, final judgments and orders of lower courts in:
(a) All cases in which the constitutionality or validity of any treaty, international or executive agreement, law, presidential decree, proclamation, order, instruction, ordinance, or regulation is in question.
(b) All cases involving the legality of any tax, impost, assessment, or toll, or any penalty imposed in relation thereto.
(c) All cases in which the jurisdiction of any lower court is in issue.
(d) All criminal cases in which the penalty imposed is reclusion perpetua or higher.
(e) All cases in which only an error or question of law is involved.
(3) Assign temporarily judges of lower courts to other stations as public interest may require...
(5) Promulgate rules concerning the protection and enforcement of constitutional rights, pleading, practice, and procedure in all courts, the admission to the practice of law, the Integrated Bar, and legal assistance to the underprivileged...

Section 7. (1) No person shall be appointed Member of the Supreme Court or any lower collegiate court unless he is a natural-born citizen of the Philippines. A Member of the Supreme Court must be at least forty years of age, and must have been for fifteen years or more a judge of a lower court or engaged in the practice of law in the Philippines.
(2) The Congress shall prescribe the qualifications of judges of lower courts, but no person may be appointed judge thereof unless he is a citizen of the Philippines and a member of the Philippine Bar.
(3) A Member of the Judiciary must be a person of proven competence, integrity, probity, and independence.

Section 8. (1) A Judicial and Bar Council is hereby created under the supervision of the Supreme Court composed of the Chief Justice as ex officio Chairman, the Secretary of Justice, and a representative of the Congress as ex officio Members, a representative of the Integrated Bar, a professor of law, a retired Member of the Supreme Court, and a representative of the private sector...

Section 11. The Members of the Supreme Court and judges of lower courts shall hold office during good behavior until they reach the age of seventy years or become incapacitated to discharge the duties of their office. The Supreme Court en banc shall have the power to discipline judges of lower courts, or order their dismissal by a vote of a majority of the Members who actually took part in the deliberations on the issues in the case and voted thereon.`
    },
    {
      id: 'consti-art-9',
      title: 'Article IX: Constitutional Commissions',
      text: `A. COMMON PROVISIONS: Section 1. The Constitutional Commissions, which shall be independent, are the Civil Service Commission, the Commission on Elections, and the Commission on Audit.
Section 2. No Member of a Constitutional Commission shall, during his tenure, hold any other office or employment...

B. CIVIL SERVICE COMMISSION: Section 1. (1) The Civil Service shall be administered by the Civil Service Commission...
Section 2. (1) The civil service embraces all branches, subdivisions, instrumentalities, and agencies of the Government, including government-owned or controlled corporations with original charters...
(2) Appointments in the civil service shall be made only according to merit and fitness to be determined, as far as practicable, and, except to positions which are policy-determining, primarily confidential, or highly technical, by competitive examination.

C. COMMISSION ON ELECTIONS: Section 1. (1) There shall be a Commission on Elections... 
Section 2. The Commission on Elections shall exercise the following powers and functions:
(1) Enforce and administer all laws and regulations relative to the conduct of an election, plebiscite, initiative, referendum, and recall...

D. COMMISSION ON AUDIT: Section 1. (1) There shall be a Commission on Audit... 
Section 2. (1) The Commission on Audit shall have the power, authority, and duty to examine, audit, and settle all accounts pertaining to the revenue and receipts of, and expenditures or uses of funds and property, owned or held in trust by, or pertaining to, the Government...`
    },
    {
      id: 'consti-art-10',
      title: 'Article X: Local Government',
      text: `GENERAL PROVISIONS: Section 1. The territorial and political subdivisions of the Republic of the Philippines are the provinces, cities, municipalities, and barangays. There shall be autonomous regions in Muslim Mindanao and the Cordilleras as hereinafter provided.
Section 2. The territorial and political subdivisions shall enjoy local autonomy.

AUTONOMOUS REGIONS: Section 15. There shall be created autonomous regions in Muslim Mindanao and in the Cordilleras consisting of provinces, cities, municipalities, and geographical areas sharing common and distinctive historical and cultural heritage, economic and social structures, and other relevant characteristics...`
    },
    {
      id: 'consti-art-11',
      title: 'Article XI: Accountability of Public Officers',
      text: `Section 1. Public office is a public trust. Public officers and employees must at all times be accountable to the people, serve them with utmost responsibility, integrity, loyalty, and efficiency, act with patriotism and justice, and lead modest lives.

Section 2. The President, the Vice-President, the Members of the Supreme Court, the Members of the Constitutional Commissions, and the Ombudsman may be removed from office, on impeachment for, and conviction of, culpable violation of the Constitution, treason, bribery, graft and corruption, other high crimes, or betrayal of public trust. All other public officers and employees may be removed from office as provided by law, but not by impeachment.

Section 3. (1) The House of Representatives shall have the exclusive power to initiate all cases of impeachment...
(6) The Senate shall have the sole power to try and decide all cases of impeachment... When the President of the Philippines is on trial, the Chief Justice of the Supreme Court shall preside, but shall not vote...

Section 5. There is hereby created the independent Office of the Ombudsman, composed of the Ombudsman to be known as Tanodbayan, one overall Deputy, and at least one Deputy each for Luzon, Visayas, and Mindanao. A separate Deputy for the military establishment may likewise be appointed.

Section 12. The Ombudsman and his Deputies, as protectors of the people, shall act promptly on complaints filed in any form or manner against public officials or employees of the Government, including government-owned or controlled corporations...`
    },
    {
      id: 'consti-art-12',
      title: 'Article XII: National Economy and Patrimony',
      text: `Section 1. The goals of the national economy are a more equitable distribution of opportunities, income, and wealth; a sustained increase in the amount of goods and services produced by the nation for the benefit of the people; and an expanding productivity as the key to raising the quality of life for all, especially the underprivileged...

Section 2. All lands of the public domain, waters, minerals, coal, petroleum, and other mineral oils, all forces of potential energy, fisheries, forests or timber, wildlife, flora and fauna, and other natural resources are owned by the State. With the exception of agricultural lands, all other natural resources shall not be alienated. The exploration, development, and utilization of natural resources shall be under the full control and supervision of the State (The Regalian Doctrine). The State may directly undertake such activities, or it may enter into co-production, joint venture, or production-sharing agreements with Filipino citizens, or corporations or associations at least sixty per centum of whose capital is owned by such citizens...

Section 3. Lands of the public domain are classified into agricultural, forest or timber, mineral lands, and national parks. Agricultural lands of the public domain may be further classified by law according to the uses to which they may be devoted. Alienable lands of the public domain shall be limited to agricultural lands...

Section 7. Save in cases of hereditary succession, no private lands shall be transferred or conveyed except to individuals, corporations, or associations qualified to acquire or hold lands of the public domain.

Section 11. No franchise, certificate, or any other form of authorization for the operation of a public utility shall be granted except to citizens of the Philippines or to corporations or associations organized under the laws of the Philippines at least sixty per centum of whose capital is owned by such citizens, nor shall such franchise, certificate, or authorization be exclusive in character or for a longer period than fifty years...`
    },
    {
      id: 'consti-art-13',
      title: 'Article XIII: Social Justice & Human Rights',
      text: `Section 1. The Congress shall give highest priority to the enactment of measures that protect and enhance the right of all the people to human dignity, reduce social, economic, and political inequalities, and remove cultural inequities by equitably diffusing wealth and political power for the common good...

LABOR: Section 3. The State shall afford full protection to labor, local and overseas, organized and unorganized, and promote full employment and equality of employment opportunities for all...

AGRARIAN AND NATURAL RESOURCES REFORM: Section 4. The State shall, by law, undertake an agrarian reform program founded on the right of farmers and regular farmworkers, who are landless, to own directly or collectively the lands they till or, in the case of other farmworkers, to receive a just share of the fruits thereof...

HUMAN RIGHTS: Section 17. (1) There is hereby created an independent office called the Commission on Human Rights.
Section 18. The Commission on Human Rights shall have the following powers and functions:
(1) Investigate, on its own or on complaint by any party, all forms of human rights violations involving civil and political rights...`
    },
    {
      id: 'consti-art-14',
      title: 'Article XIV: Education, Science, Tech & Culture',
      text: `EDUCATION: Section 1. The State shall protect and promote the right of all citizens to quality education at all levels and shall take appropriate steps to make such education accessible to all.
Section 2. The State shall:
(1) Establish, maintain, and support a complete, adequate, and integrated system of education relevant to the needs of the people and society;
(2) Establish and maintain a system of free public education in the elementary and high school levels. Without limiting the natural right of parents to rear their children, elementary education is compulsory for all children of school age...

LANGUAGE: Section 6. The national language of the Philippines is Filipino. As it evolves, it shall be further developed and enriched on the basis of existing Philippine and other languages.
Subject to provisions of law and as the Congress may deem appropriate, the Government shall take steps to initiate and sustain the use of Filipino as a medium of official communication and as language of instruction in the educational system.
Section 7. For purposes of communication and instruction, the official languages of the Philippines are Filipino and, until otherwise provided by law, English.`
    },
    {
      id: 'consti-art-15',
      title: 'Article XV: The Family',
      text: `Section 1. The State recognizes the Filipino family as the foundation of the nation. Accordingly, it shall strengthen its solidarity and actively promote its total development.

Section 2. Marriage, as an inviolable social institution, is the foundation of the family and shall be protected by the State.

Section 3. The State shall defend:
(1) The right of spouses to found a family in accordance with their religious convictions and the demands of responsible parenthood;
(2) The right of children to assistance, including proper care and nutrition, and special protection from all forms of neglect, abuse, cruelty, exploitation, and other conditions prejudicial to their development;
(3) The right of the family to a family living wage and income; and
(4) The right of families or family associations to participate in the planning and implementation of policies and programs that affect them.`
    },
    {
      id: 'consti-art-16',
      title: 'Article XVI: General Provisions',
      text: `Section 1. The flag of the Philippines shall be red, white, and blue, with a sun and three stars, as consecrated and honored by the people and recognized by law.

Section 2. The Congress may, by law, adopt a new name for the country, a new national anthem, or a new national seal, which shall all be truly reflective and symbolic of the ideals, history, and traditions of the people. Such law shall take effect only upon its ratification by the people in a national referendum.

Section 3. The State may not be sued without its consent (Sovereign Immunity).`
    },
    {
      id: 'consti-art-17',
      title: 'Article XVII: Amendments or Revisions',
      text: `Section 1. Any amendment to, or revision of, this Constitution may be proposed by:
(1) Any amendment to, or revision of, this Constitution may be proposed by:
1. The Congress, upon a vote of three-fourths of all its Members; or
2. A constitutional convention.

Section 2. Amendments to this Constitution may also be directly proposed by the people through initiative upon petition of at least twelve per centum of the total number of registered voters, of which every legislative district must be represented by at least three per centum of the registered voters therein. No amendment under this section shall be authorized within five years following the ratification of this Constitution nor oftener than once every five years thereafter...`
    },
    {
      id: 'consti-art-18',
      title: 'Article XVIII: Transitory Provisions',
      text: `Section 25. After the expiration in 1991 of the Agreement between the Republic of the Philippines and the United States of America concerning Military Bases, foreign military bases, troops, or facilities shall not be allowed in the Philippines except under a treaty duly concurred in by the Senate and, when the Congress so requires, ratified by a majority of the votes cast by the people in a national referendum held for that purpose, and recognized as a treaty by the other contracting State.

Section 27. This Constitution shall take effect immediately upon its ratification by a majority of the votes cast in a plebiscite held for the purpose and shall supersede all previous Constitutions.`
    }
  ]
};

export const ALL_DOCS: WorkspaceDocument[] = [
  CONSTI_LAW_DOC,
  PHIL_CONSTITUTION_COMPLETE_DOC,
  CRIMINAL_LAW_DOC,
  LABOR_LAW_DOC,
  CIVIL_LAW_DOC,
  REMEDIAL_LAW_DOC,
  SAMPLE_PROJECT_PLAN,
  SAMPLE_MEETING_NOTES
];
