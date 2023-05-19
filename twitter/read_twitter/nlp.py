from transformers import pipeline

class RelevanceGrader:
    def __init__(self):
        self.classifier = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')
        self.labels = ["food or coffee", "alcohol and drinking", "gambling and entertainment"]
        self.hypothesis = 'This text is about {}.'
        self.multi_label = True

    def grade(self, sentences):
        """
        Example usage:
        `
        cls = RelevanceGrader()

        # Input a list of strings (Around 100 sentences is considered to be the most efficient, takes around 2mins.)
        res = cls.grade([    "I bet Lakers win.",    "The food at this restaurant is amazing.",    "I'm not a fan of gambling.",    "I'm craving some Chinese 
food.",    "I always enjoy trying new restaurants.",    "Gambling is a dangerous addiction.",    "This restaurant has great reviews on Yelp.",    "I'm trying to 
cut down on my gambling habits.",    "I prefer home-cooked meals over eating out.",    "I've never been to a casino before."])
        `

        Example output (json array):
        `
        [
            {'sequence': 'I bet Lakers win.',
                'labels': ['gambling', 'alcohol and drinking', 'food or coffee'],
                'scores': [0.9923581480979919, 0.0689515545964241, 0.002668901579454541]
            }, 
            {'sequence': 'The food at this restaurant is amazing.',
                'labels': ['food or coffee', 'alcohol and drinking', 'gambling'],
                'scores': [0.32014691829681396, 0.0007310434011742473, 0.00019467658421490341]
            }
        ]
        `
        """
        return self.classifier(sentences, self.labels, hypothesis_template=self.hypothesis, multi_label=self.multi_label)
