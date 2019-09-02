CREATE TABLE [dbo].[Move] (
    [Move_PK]           INT           IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]          NCHAR (10)    NULL,
    [CreatedTime]       DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Turn_FK]           INT           NOT NULL,
    [CardCollection_FK] INT           NOT NULL,
    [Row]               INT           NOT NULL,
    [Column]            INT           NOT NULL,
    CONSTRAINT [PK_Move] PRIMARY KEY CLUSTERED ([Move_PK] ASC),
    CONSTRAINT [CK_Move_Column] CHECK ([Column]>=(0)),
    CONSTRAINT [CK_Move_Row] CHECK ([Row]>=(0)),
    CONSTRAINT [FK_Move_CardCollection_FK] FOREIGN KEY ([CardCollection_FK]) REFERENCES [dbo].[CardCollection] ([CardCollection_PK]),
    CONSTRAINT [FK_Move_Turn_FK] FOREIGN KEY ([Turn_FK]) REFERENCES [dbo].[Turn] ([Turn_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Move_Turn_FK]
    ON [dbo].[Move]([Turn_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Move_CardCollection_FK]
    ON [dbo].[Move]([CardCollection_FK] ASC);

