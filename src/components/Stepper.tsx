import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

export type Step = {
    label: string;
    sublabel?: string;
};

type Props = {
    steps: Step[];
    currentStep: number; // 1-based index (1, 2, 3)
};

const Stepper = ({ steps, currentStep }: Props) => {
    return (
        <View style={styles.stepper}>
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;
                const isPending = stepNumber > currentStep;

                // Determine line color - GREEN only if the step on the LEFT is completed
                const isLineCompleted = stepNumber < currentStep;
                const lineColor = isLineCompleted ? '#4FD43E' : '#0C1445';

                return (
                    <React.Fragment key={index}>
                        {/* Step Circle */}
                        <View style={styles.stepItem}>
                            <View
                                style={[
                                    styles.stepCircle,
                                    isCompleted && styles.stepCompleted,
                                    isActive && styles.stepActive,
                                    isPending && styles.stepPending,
                                ]}
                            >
                                {isCompleted ? (
                                    <Check size={14} color="#4FD43E" />
                                ) : (
                                    <View style={styles.stepInner} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    isCompleted && styles.stepLabelCompleted,
                                    isActive && styles.stepLabelActive,
                                    isPending && styles.stepLabelPending,
                                ]}
                            >
                                {step.sublabel || step.label}
                            </Text>
                        </View>

                        {/* Line between steps (except after last step) */}
                        {index < steps.length - 1 && (
                            <View
                                style={[
                                    styles.stepLine,
                                    { backgroundColor: lineColor },
                                ]}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        height: 50,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
        height: 50,
    },
    stepCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    stepInner: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#0C1445',
    },
    // Step states
    stepCompleted: {
        borderColor: '#4FD43E',
    },
    stepActive: {
        borderColor: '#0C1445',
    },
    stepPending: {
        borderColor: '#0C1445',
    },
    // Label styles
    stepLabel: {
        fontFamily: 'Inter',
        fontWeight: '300',
        fontSize: 9,
        lineHeight: 11,
        color: '#0C1445',
        textAlign: 'center',
    },
    stepLabelCompleted: {
        fontWeight: '600',
        color: '#4FD43E',
    },
    stepLabelActive: {
        fontWeight: '400',
        color: '#0C1445',
    },
    stepLabelPending: {
        fontWeight: '300',
        color: '#0C1445',
    },
    // Line styles
    stepLine: {
        flex: 1,
        height: 2,
        marginBottom: 20,
        marginHorizontal: 4,
    },
});

export default Stepper;