CREATE TABLE [dbo].[Card] (
    [Card_PK]     INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION      NOT NULL,
    [Name]        NVARCHAR (100)  NOT NULL,
    [Description] NVARCHAR (1000) NULL,
    [UpAttack]    INT             DEFAULT (0) NOT NULL,
    [RightAttack] INT             DEFAULT (0) NOT NULL,
    [DownAttack]  INT             DEFAULT (0) NOT NULL,
    [LeftAttack]  INT             DEFAULT (0) NOT NULL,
    [Health]      INT             DEFAULT (1) NOT NULL,
    [Attack]      INT             DEFAULT (0) NOT NULL,
    [Defence]     INT             DEFAULT (0) NOT NULL,
    [Rarity_FK]   INT             DEFAULT (1) NOT NULL, 
    [TotalStats]  AS              isnull([UpAttack] + [RightAttack] + [DownAttack] + [LeftAttack] + [Health] + [Attack] + [Defence], 0),
    CONSTRAINT [PK_Card] PRIMARY KEY CLUSTERED ([Card_PK] ASC),
    CONSTRAINT [FK_Card_Rarity_FK] FOREIGN KEY ([Rarity_FK]) REFERENCES [dbo].[Rarity] ([Rarity_PK])
);

GO
CREATE NONCLUSTERED INDEX [IX_Card_Rarity_FK]
    ON [dbo].[Card]([Rarity_FK] ASC);
