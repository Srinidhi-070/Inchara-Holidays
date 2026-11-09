# -*- coding: utf-8 -*-
import re

def update_school_trip_modal():
    path = "src/components/SchoolTripModal.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add imports if not present
    if "import { CustomSelect }" not in content:
        content = content.replace(
            "import { getWhatsAppInquiryUrl } from '../config/brand';",
            "import { getWhatsAppInquiryUrl } from '../config/brand';\nimport { CustomSelect } from './CustomSelect';\nimport { CustomDatePicker } from './CustomDatePicker';"
        )

    # 1. studentCount
    content = re.sub(
        r'<select\s+value=\{formData\.studentCount\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.studentCount}
                        onChange={(val) =>
                          setFormData({ ...formData, studentCount: val })
                        }
                        placeholder={isKn ? "ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ" : "Select count"}
                        options={studentCountOptions.map((c) => ({
                          value: c,
                          label: `${c} ${isKn ? 'ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Students'}`,
                        }))}
                      />''',
        content
    )

    # 2. gradeLevels
    content = re.sub(
        r'<select\s+value=\{formData\.gradeLevels\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.gradeLevels}
                        onChange={(val) =>
                          setFormData({ ...formData, gradeLevels: val })
                        }
                        placeholder={isKn ? "ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ" : "Select grade"}
                        options={(isKn ? gradeLevelOptionsKn : gradeLevelOptionsEn).map((g) => ({
                          value: g,
                          label: g,
                        }))}
                      />''',
        content
    )

    # 3. durationDays
    content = re.sub(
        r'<select\s+value=\{formData\.durationDays\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.durationDays}
                        onChange={(val) =>
                          setFormData({ ...formData, durationDays: val })
                        }
                        placeholder={isKn ? "ಸಮಯಾವಧಿ ಆಯ್ಕೆಮಾಡಿ" : "Select duration"}
                        options={(isKn ? durationOptionsKn : durationOptionsEn).map((d) => ({
                          value: d,
                          label: d,
                        }))}
                      />''',
        content
    )

    # 4. learningFocus
    content = re.sub(
        r'<select\s+value=\{formData\.learningFocus\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.learningFocus}
                        onChange={(val) =>
                          setFormData({ ...formData, learningFocus: val })
                        }
                        placeholder={isKn ? "ಉದ್ದೇಶ ಆಯ್ಕೆಮಾಡಿ" : "Select focus"}
                        options={(isKn ? learningFocusOptionsKn : learningFocusOptionsEn).map((l) => ({
                          value: l,
                          label: l,
                        }))}
                      />''',
        content
    )

    # 5. preferredDates
    content = re.sub(
        r'<input\s+type="date"\s+value=\{formData\.preferredDates\}[\s\S]*?\/>',
        '''<CustomDatePicker
                        value={formData.preferredDates}
                        onChange={(val) =>
                          setFormData({ ...formData, preferredDates: val })
                        }
                        locale={language}
                        placeholder={isKn ? "ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ" : "Select travel date"}
                      />''',
        content
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated SchoolTripModal.tsx")


def update_corporate_modal():
    path = "src/components/CorporateEventModal.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "import { CustomSelect }" not in content:
        content = content.replace(
            "import { getWhatsAppInquiryUrl } from '../config/brand';",
            "import { getWhatsAppInquiryUrl } from '../config/brand';\nimport { CustomSelect } from './CustomSelect';\nimport { CustomDatePicker } from './CustomDatePicker';"
        )

    # 1. eventType
    content = re.sub(
        r'<select\s+value=\{formData\.eventType\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.eventType}
                        onChange={(val) =>
                          setFormData({ ...formData, eventType: val })
                        }
                        placeholder={isKn ? "ಸ್ವರೂಪ ಆಯ್ಕೆಮಾಡಿ" : "Select event type"}
                        options={(isKn ? eventTypesKn : eventTypesEn).map((t) => ({
                          value: t,
                          label: t,
                        }))}
                      />''',
        content
    )

    # 2. preferredDate
    content = re.sub(
        r'<input\s+type="date"\s+value=\{formData\.preferredDate\}[\s\S]*?\/>',
        '''<CustomDatePicker
                        value={formData.preferredDate}
                        onChange={(val) =>
                          setFormData({ ...formData, preferredDate: val })
                        }
                        locale={language}
                        placeholder={isKn ? "ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ" : "Select event date"}
                      />''',
        content
    )

    # 3. attendeeCount
    content = re.sub(
        r'<select\s+value=\{formData\.attendeeCount\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.attendeeCount}
                        onChange={(val) =>
                          setFormData({ ...formData, attendeeCount: val })
                        }
                        placeholder={isKn ? "ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ" : "Select count"}
                        options={attendeeCounts.map((count) => ({
                          value: count,
                          label: `${count} ${isKn ? 'ಸದಸ್ಯರು' : 'People'}`,
                        }))}
                      />''',
        content
    )

    # 4. locationPreference
    content = re.sub(
        r'<select\s+value=\{formData\.locationPreference\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.locationPreference}
                        onChange={(val) =>
                          setFormData({ ...formData, locationPreference: val })
                        }
                        placeholder={isKn ? "ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ" : "Select location"}
                        options={(isKn ? locationsKn : locationsEn).map((loc) => ({
                          value: loc,
                          label: loc,
                        }))}
                      />''',
        content
    )

    # 5. budgetRange
    content = re.sub(
        r'<select\s+value=\{formData\.budgetRange\}[\s\S]*?<\/select>',
        '''<CustomSelect
                      value={formData.budgetRange}
                      onChange={(val) =>
                        setFormData({ ...formData, budgetRange: val })
                      }
                      placeholder={isKn ? "ಬಜೆಟ್ ಆಯ್ಕೆಮಾಡಿ" : "Select budget"}
                      options={(isKn ? budgetRangesKn : budgetRangesEn).map((b) => ({
                        value: b,
                        label: b,
                      }))}
                    />''',
        content
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated CorporateEventModal.tsx")


def update_catering_modal():
    path = "src/components/CateringModal.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "import { CustomSelect }" not in content:
        content = content.replace(
            "import { getWhatsAppInquiryUrl } from '../config/brand';",
            "import { getWhatsAppInquiryUrl } from '../config/brand';\nimport { CustomSelect } from './CustomSelect';\nimport { CustomDatePicker } from './CustomDatePicker';"
        )

    # 1. occasionType
    content = re.sub(
        r'<select\s+value=\{formData\.occasionType\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.occasionType}
                        onChange={(val) =>
                          setFormData({ ...formData, occasionType: val })
                        }
                        placeholder={isKn ? "ಸಮಾರಂಭ ಆಯ್ಕೆಮಾಡಿ" : "Select occasion"}
                        options={(isKn ? occasionOptionsKn : occasionOptionsEn).map((o) => ({
                          value: o,
                          label: o,
                        }))}
                      />''',
        content
    )

    # 2. guestCount
    content = re.sub(
        r'<select\s+value=\{formData\.guestCount\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.guestCount}
                        onChange={(val) => setFormData({ ...formData, guestCount: val })}
                        placeholder={isKn ? "ಅತಿಥಿ ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ" : "Select guests"}
                        options={guestCountOptions.map((g) => ({
                          value: g,
                          label: `${g} ${isKn ? 'ಜನರು' : 'Guests'}`,
                        }))}
                      />''',
        content
    )

    # 3. eventDate
    content = re.sub(
        r'<input\s+type="date"\s+value=\{formData\.eventDate\}[\s\S]*?\/>',
        '''<CustomDatePicker
                        value={formData.eventDate}
                        onChange={(val) => setFormData({ ...formData, eventDate: val })}
                        locale={language}
                        placeholder={isKn ? "ಕಾರ್ಯಕ್ರಮ ದಿನಾಂಕ" : "Select event date"}
                      />''',
        content
    )

    # 4. dietaryPreference
    content = re.sub(
        r'<select\s+value=\{formData\.dietaryPreference\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.dietaryPreference}
                        onChange={(val) =>
                          setFormData({ ...formData, dietaryPreference: val })
                        }
                        placeholder={isKn ? "ಆಹಾರ ಆದ್ಯತೆ ಆಯ್ಕೆಮಾಡಿ" : "Select dietary"}
                        options={(isKn ? dietaryOptionsKn : dietaryOptionsEn).map((d) => ({
                          value: d,
                          label: d,
                        }))}
                      />''',
        content
    )

    # 5. serviceStyle
    content = re.sub(
        r'<select\s+value=\{formData\.serviceStyle\}[\s\S]*?<\/select>',
        '''<CustomSelect
                        value={formData.serviceStyle}
                        onChange={(val) =>
                          setFormData({ ...formData, serviceStyle: val })
                        }
                        placeholder={isKn ? "ಶೈಲಿ ಆಯ್ಕೆಮಾಡಿ" : "Select style"}
                        options={(isKn ? serviceStyleOptionsKn : serviceStyleOptionsEn).map((s) => ({
                          value: s,
                          label: s,
                        }))}
                      />''',
        content
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated CateringModal.tsx")


if __name__ == "__main__":
    update_school_trip_modal()
    update_corporate_modal()
    update_catering_modal()
